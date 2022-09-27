const express = require('express');

const {
	Spot,
	User,
	Review,
	sequelize,
	SpotImage,
	ReviewImage,
	Booking
} = require('../../db/models');
const { Op } = require('sequelize');
const { authentication, createPaginationObject } = require('../../utils/auth');

const router = express.Router();

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

// Create a Booking from spot based on the Spot's id
router.post('/:spotId/bookings', authentication, async (req, res, next) => {
	const spotId = parseInt(req.params.spotId);
	const userId = req.user.id;
	const { startDate, endDate } = req.body;

	const findSpot = await Spot.findByPk(spotId);
	if (findSpot) {
		// error if the user is the owner of the spot, cant make booking on your own place
		if (findSpot.ownerId == userId) {
			return res.status(403).json({
				message: "Sorry, you can't create booking on your own hosting",
				statusCode: 403
			});
		}

		// get all bookings for the spot
		const bookings = await findSpot.getBookings();
		for (let i = 0; i < bookings.length; i++) {
			let booking = bookings[i];

			// conflicting start date
			if (
				(startDate >= booking.startDate && startDate <= booking.endDate) ||
				startDate === booking.startDate ||
				startDate === booking.endDate
			) {
				return res.status(403).json({
					message: 'Sorry, this spot is already booked for the specified dates',
					statusCode: 403,
					errors: {
						startDate: 'Start date conflicts with an existing booking'
					}
				});
			}
			// conflicting End date
			if (
				(endDate >= booking.startDate && endDate <= booking.endDate) ||
				endDate === booking.startDate ||
				endDate === booking.endDate
			) {
				return res.status(403).json({
					message: 'Sorry, this spot is already booked for the specified dates',
					statusCode: 403,
					errors: {
						endDate: 'End date conflicts with an existing booking'
					}
				});
			}
		}

		//create new booking
		try {
			const newBooking = await Booking.build({
				spotId,
				userId,
				endDate,
				startDate
			});

			await newBooking.validate();
			await newBooking.save();

			return res.json(newBooking);
		} catch (error) {
			console.log(error);
			error.status = 403;
			error.message = 'validation Error';
			return next(error);
		}
	}

	// no Spot found with given Id
	return res.status(404).json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
});

// Get all Bookings for a Spot based on the Spot's Id
router.get('/:spotId/bookings', authentication, async (req, res, next) => {
	const spotId = parseInt(req.params.spotId);
	const userId = req.user.id;
	let Bookings = [];
	const findSpot = await Spot.findByPk(spotId);

	if (findSpot) {
		// if the user is the owner of the spot
		if (findSpot.ownerId === userId) {
			Bookings = await findSpot.getBookings({
				include: {
					model: User,
					attributes: ['id', 'firstName', 'lastName']
				}
			});
			return res.json({ Bookings });
		}

		// the spot does not belong to current user.
		Bookings = await findSpot.getBookings({
			attributes: ['spotId', 'startDate', 'endDate']
		});

		return res.json({ Bookings });
	}

	// no Spot found with given Id
	return res.status(404).json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
});

// Create new review for a spot based on the Spot's Id
router.post('/:spotId/reviews', authentication, async (req, res, next) => {
	const spotId = parseInt(req.params.spotId);
	const userId = req.user.id;
	const { review, stars } = req.body;
	// find the spot to add review
	const findSpot = await Spot.findByPk(spotId);

	if (findSpot) {
		//Check to see wether user have already created a review for this spot
		const reviewExist = await Review.findOne({
			where: {
				spotId,
				userId
			}
		});

		// error response of review already exist for spot/user
		if (reviewExist) {
			return res.status(403).json({
				message: 'User already has a review for this spot',
				statusCode: 403
			});
		}

		//build new view
		try {
			const newReview = await Review.build({
				spotId,
				userId,
				review,
				stars
			});

			await newReview.validate();
			await newReview.save();

			findSpot.addReview(newReview);

			return res.status(201).json(newReview);
		} catch (error) {
			error.status = 400;
			error.message = 'Validation Error';
			return next(error);
			// return res.status(400).json({
			// 	message: 'Validation error',
			// 	statusCode: 400,
			// 	errors: {
			// 		review: 'Review text is required',
			// 		stars: 'Stars must be an integer from 1 to 5'
			// 	}
			// });
		}
	}

	// no Spot found with given Id
	return res.status(404).json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
});
//Get all review by spot Id
router.get('/:spotId/reviews', async (req, res, next) => {
	const spotId = parseInt(req.params.spotId);
	const findSpot = await Spot.findByPk(spotId);

	if (findSpot) {
		const Reviews = await findSpot.getReviews({
			include: [
				{
					model: User,
					attributes: ['id', 'firstName', 'lastName']
				},
				{
					model: ReviewImage,
					attributes: ['id', 'url']
				}
			]
		});
		return res.json({ Reviews });
	}

	return res.status(404).json({
		message: "Spot couldn't be found",
		statusCode: 404
	});
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
		} catch (error) {
			// catch error for fail validation for new spot image
			error.status = 400;
			error.message = 'Validation Error';
			return next(error);
			// return res.status(400).json({
			// 	message: 'Validation Error',
			// 	statusCode: 400,
			// 	errors: {
			// 		url: 'url is required.',
			// 		preview: 'preview indicator is required'
			// 	}
			// });
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
	} catch (error) {
		// validation error response
		error.status = 400;
		error.message = 'Validation Error';
		return next(error);
	}
});
// CREATE NEW SPOT, under current user.
router.post('/', authentication, async (req, res, next) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	const ownerId = req.user.id;
	const findOwner = await User.findByPk(ownerId);
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

		await findOwner.addSpot(newSpot);
		return res.status(201).json(newSpot);
	} catch (error) {
		error.status = 400;
		error.message = 'Validation Error';
		return next(error);
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
