const express = require('express');

const { Spot, User, Review, sequelize, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

// AUTHENTICATION middleware
const authentication = (req, res, next) => {
	if (req.user) return next();

	res.status(401);
	res.json({
		message: 'Authentication required',
		statusCode: 401
	});
};

// GET SPOTS OF CURRENT USER
router.get('/current', authentication, async (req, res, next) => {
	const ownerId = req.user.id;

	// query all spot owned by current user
	let findSpots = await Spot.findAll({
		where: {
			ownerId
		}
	});

	let Spots = [];
	// formulating response
	for (let i = 0; i < findSpots.length; i++) {
		let spot = findSpots[i].toJSON();
		// GET AVG Rating for each Spot
		let rating = await Review.findAll({
			where: {
				spotId: Number(spot.id)
			},
			attributes: [
				[sequelize.fn('AVG', sequelize.col('Review.stars')), 'avgRating']
			],
			raw: true
		});
		// format avgRating to 1 decimal places
		const check = Number(rating[0].avgRating).toFixed(1);
		spot.avgRating = parseFloat(check);

		//GET PREVIEW IMAGE
		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ spotId: spot.id }, { preview: true }]
			}
		});
		if (previewImage) spot.previewImage = previewImage.url;
		Spots.push(spot);
	}

	return res.json({ Spots });
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', authentication, async (req, res, next) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;

	const { url, preview } = req.body;
	const findSpot = await Spot.findByPk(spotId);

	if (findSpot) {
		// authorization, make sure spot belongs to current user.
		if (ownerId !== findSpot.ownerId) {
			res.status(403);
			return res.json({
				message: 'Forbidden',
				statusCode: 403
			});
		}
		try {
			// create new spot image
			const newSpotImage = await SpotImage.build({ spotId, url, preview });
			await newSpotImage.validate();
			await newSpotImage.save();

			// associate new spot image with the specified spot
			findSpot.addSpotImage(newSpotImage);

			// formulate response
			const resNewSpot = {};
			resNewSpot.id = newSpotImage.id;
			resNewSpot.url = newSpotImage.url;
			resNewSpot.preview = newSpotImage.preview;
			return res.json(resNewSpot);
		} catch {
			// catch error for fail validation for new spot image
			return res.status(400).json({
				message: 'Validation Error',
				statusCode: 400,
				errors: {
					url: 'url is required.',
					preview: 'preview indicator is required'
				}
			});
		}
	}

	res.status(404);
	return res.json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
});
// GET SPOT BY SPOT ID
router.get('/:spotId', async (req, res, next) => {
	const spotId = req.params.spotId;

	// Getting the spot with all spot images and its owner with it,eager loading
	const spot = await Spot.findByPk(spotId, {
		include: [
			{
				model: SpotImage,
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			},
			{
				model: User,
				as: 'Owner',
				attributes: ['id', 'firstName', 'lastName']
			}
		]
	});

	// couldn't find a spot with specified Id
	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404
		});
	}

	// get review count and avgStarting based on found spot
	let allReview = await spot.getReviews();
	let sumRating = 0;
	let reviewCount = 0;
	allReview.forEach((review) => {
		reviewCount++;
		sumRating += review.stars;
	});
	let avgStarRating = (sumRating / allReview.length).toFixed(1);

	//formulating response
	const resSpot = spot.toJSON();
	resSpot.numReviews = reviewCount;
	resSpot.avgStarRating = parseFloat(avgStarRating);
	return res.json(resSpot);
});

// DELETE a SPOT
router.delete('/:spotId', authentication, async (req, res, next) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;

	// Find spot by primary key
	const deletingSpot = await Spot.findByPk(spotId);

	if (deletingSpot) {
		//authorization, error if current user is not the owner of the spot
		if (ownerId !== deletingSpot.ownerId) {
			return res.status(404).json({
				message: 'Forbidden',
				statusCode: 403
			});
		}

		// deleting the spot, and response successfull
		await deletingSpot.destroy();
		return res.json({
			message: 'Successfully deleted',
			statusCode: 200
		});
	}

	// error response when spot not found
	return res.status(404).json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
});
// EDIT A SPOT
router.put('/:spotId', authentication, async (req, res, next) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;
	const { address, city, country, lat, lng, name, description, price } =
		req.body;

	const findSpot = await Spot.findByPk(spotId);

	// Error if spot cannot be found.
	if (!findSpot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404
		});
	}
	// error if the spot doesn't belong to the current user.
	if (findSpot.ownerId !== ownerId) {
		return res.status(403).json({
			message: 'Forbidden',
			statusCode: 403
		});
	}

	try {
		//update current spot with given body
		await findSpot.update({
			address,
			city,
			country,
			lat,
			lng,
			name,
			description,
			price
		});

		return res.json(findSpot);
	} catch {
		// validation error response
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				address: 'Street address is required',
				city: 'City is required',
				state: 'State is required',
				country: 'Country is required',
				lat: 'Latitude is not valid',
				lng: 'Longitude is not valid',
				name: 'Name must be less than 50 characters',
				description: 'Description is required',
				price: 'Price per day is required'
			}
		});
	}
});
// CREATE NEW SPOT, under current user.
router.post('/', authentication, async (req, res, next) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	const ownerId = req.user.id;

	try {
		// create new spot with given body, and id of current user as owner
		const newSpot = await Spot.build({
			ownerId,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price
		});

		await newSpot.validate();
		await newSpot.save();

		return res.json(newSpot);
	} catch {
		res.status(400);
		return res.json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				address: 'Street address is required',
				city: 'City is required',
				state: 'State is required',
				country: 'Country is required',
				lat: 'Latitude is not valid',
				lng: 'Longitude is not valid',
				name: 'Name must be less than 50 characters',
				description: 'Description is required',
				price: 'Price per day is required'
			}
		});
	}
});

// GET ALL SPOTS
router.get('/', async (req, res, next) => {
	let findSpots = await Spot.findAll();

	let Spots = [];
	for (let i = 0; i < findSpots.length; i++) {
		let spot = findSpots[i].toJSON();
		// console.log(spot);
		// GET AVG Rating for each Spot
		let rating = await Review.findAll({
			where: {
				spotId: Number(spot.id)
			},
			attributes: [
				[sequelize.fn('AVG', sequelize.col('Review.stars')), 'avgRating']
			],
			raw: true
		});
		const check = Number(rating[0].avgRating).toFixed(1);
		spot.avgRating = parseFloat(check);

		//GET PREVIEW IMAGE
		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ spotId: spot.id }, { preview: true }]
			}
		});
		if (previewImage) spot.previewImage = previewImage.url;

		Spots.push(spot);
	}

	return res.json({ Spots });
});
module.exports = router;
