const express = require('express');

const {
	Spot,
	User,
	Review,
	SpotImage,
	ReviewImage
} = require('../../db/models');
const { Op } = require('sequelize');
const { authentication } = require('../../utils/auth');

const router = express.Router();

// Add an image to a review based on the review's Id
router.post('/:reviewId/images', authentication, async (req, res, next) => {
	const reviewId = parseInt(req.params.reviewId);
	const userId = req.user.id;
	const { url } = req.body;
	const findReview = await Review.findByPk(reviewId);

	if (findReview) {
		// Checking to see if review belong to the user
		if (findReview.userId !== userId) {
			return res.status(403).json({
				message: 'Forbidden',
				statusCode: 403
			});
		}
		// check to see wether image limit exceeded
		const imagesCount = await ReviewImage.count({ where: { reviewId } });
		if (imagesCount >= 10) {
			return res.status(403).json({
				message: 'Maximum number of images for this resource was reached',
				statusCode: 403
			});
		}

		// create new ReviewImage and add association.
		const newReviewImage = await ReviewImage.build({ reviewId, url });
		await newReviewImage.validate();
		await newReviewImage.save();

		findReview.addReviewImage(newReviewImage);

		// formulate response
		let jsonReviewImage = newReviewImage.toJSON();
		const response = {};
		response.id = jsonReviewImage.id;
		response.url = jsonReviewImage.url;

		return res.json(response);
	}

	return res.status(404).json({
		message: "Review couldn't be found",
		statusCode: 404
	});
});

// GET all review of current user
router.get('/current', authentication, async (req, res, next) => {
	const userId = req.user.id;
	let Reviews = [];

	// find all reviews current user have made, include user,spot,reviewImage
	const findReview = await Review.findAll({
		where: {
			userId
		},
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
		review.Spot.previewImage = previewImage
			? previewImage.url
			: 'No preview Images yet!';

		Reviews.push(review);
	}
	//response
	return res.json({ Reviews });
});

router.put('/:reviewId', authentication, async (req, res, next) => {
	const reviewId = parseInt(req.params.reviewId);
	const userId = req.user.id;
	const { review, stars } = req.body;
	const findReview = await Review.findByPk(reviewId);

	if (findReview) {
		// Authorization, Make sure review belongs to current user
		if (findReview.userId !== userId) {
			return res.status(403).json({
				message: 'Forbidden',
				statusCode: 403
			});
		}

		// update review
		await findReview.update({ review, stars });

		return res.json(findReview);
	}

	// to review found
	return res.status(404).json({
		message: "Review couldn't be found",
		statusCode: 404
	});
});

router.delete('/:reviewId', authentication, async (req, res, next) => {
	const reviewId = parseInt(req.params.reviewId);
	const userId = req.user.id;

	const findReview = await Review.findByPk(reviewId);

	if (findReview) {
		if (findReview.userId !== userId) {
			return res.status(403).json({
				message: 'Forbidden',
				statusCode: 403
			});
		}

		await findReview.destroy();

		return res.json({
			message: 'Successfully deleted',
			statusCode: 200
		});
	}

	return res.status(404).json({
		message: "Review couldn't be found",
		statusCode: 404
	});
});

module.exports = router;
