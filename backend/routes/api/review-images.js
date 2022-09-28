const express = require('express');

const { Review, ReviewImage } = require('../../db/models');
const { authentication } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', authentication, async (req, res, next) => {
	const imageId = parseInt(req.params.imageId);
	const userId = req.user.id;

	const foundReviewImage = await ReviewImage.findByPk(imageId, {
		include: {
			model: Review,
			attributes: ['userId']
		}
	});

	if (foundReviewImage) {
		if (foundReviewImage.Review.userId == userId) {
			await foundReviewImage.destroy();

			return res.json({
				message: 'Successfully deleted',
				statusCode: 200
			});
		} else {
			return res.status(403).json({
				message: 'Sorry, this review this not belongs to you',
				statusCode: 403
			});
		}
	}

	return res.status(404).json({
		message: "Review Image couldn't be found",
		statusCode: 404
	});
});
module.exports = router;
