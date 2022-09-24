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

router.get('/current', authentication, async (req, res, next) => {
	const ownerId = req.user.id;

	let findSpots = await Spot.findAll({
		where: {
			ownerId
		}
	});

	let Spots = [];
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
		const check = Number(rating[0].avgRating).toFixed(1);
		spot.avgRating = parseFloat(check);

		//GET PREVIEW IMAGE
		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ spotId: spot.id }, { preview: true }]
			}
		});
		spot.previewImage = previewImage.url;
		Spots.push(spot);
	}

	res.json({ Spots });
});

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
		spot.previewImage = previewImage.url;
		Spots.push(spot);
	}

	res.json({ Spots });
});
module.exports = router;
