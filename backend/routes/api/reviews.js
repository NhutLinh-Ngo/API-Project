const express = require('express');

const {
	Spot,
	User,
	Review,
	sequelize,
	SpotImage,
	ReviewImage
} = require('../../db/models');
const { Op } = require('sequelize');
const { authentication } = require('../../utils/auth');

const router = express.Router();

// GET all review of current user
router.get('/current', authentication, async (req, res, next) => {
	const userId = req.user.id;
	let Reviews = [];

	// find all reviews current user have made, include user,spot,reviewImage
	const findReview = await Review.findAll({
		where: {
			userId
		},
		attributes: [
			'id',
			'userId',
			'spotId',
			'review',
			'stars',
			'createdAt',
			'updatedAt'
		],
		include: [
			{
				model: User,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: Spot,
				attributes: {
					exclude: ['description', 'createdAt', 'updatedAt']
				}
			},
			{
				model: ReviewImage,
				attributes: ['id', 'url']
			}
		]
	});
	// adding preview image to each Spot
	for (let i = 0; i < findReview.length; i++) {
		const review = findReview[i].toJSON();
		const spotId = review.Spot.id;

		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ preview: true }, { spotId }]
			}
		});
		if (previewImage) review.Spot.previewImage = previewImage.url;

		Reviews.push(review);
	}
	//response
	res.json({ Reviews });
});
module.exports = router;
