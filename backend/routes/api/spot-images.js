const express = require('express');

const { Spot, SpotImage } = require('../../db/models');
const { authentication } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', authentication, async (req, res, next) => {
	const imageId = parseInt(req.params.imageId);
	const userId = req.user.id;

	const FoundSpotImage = await SpotImage.findByPk(imageId, {
		include: {
			model: Spot,
			attributes: ['ownerId']
		}
	});

	if (FoundSpotImage) {
		if (FoundSpotImage.Spot.ownerId == userId) {
			await FoundSpotImage.destroy();

			return res.json({
				message: 'Successfully deleted',
				statusCode: 200
			});
		} else {
			return res.status(403).json({
				message: 'This spot does not belong to you',
				statusCode: 403
			});
		}
	}

	return res.status(404).json({
		message: "Spot Image couldn't be found",
		statusCode: 404
	});
});
module.exports = router;
