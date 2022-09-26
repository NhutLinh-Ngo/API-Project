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

// get all of current user's bookings
const router = express.Router();

router.get('/current', authentication, async (req, res, next) => {
	const userId = req.user.id;
	let Bookings = [];

	const findBookings = await Booking.findAll({
		where: {
			userId
		},
		include: {
			model: Spot,
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'description']
			}
		}
	});
	// adding preview image to each Spot
	for (let i = 0; i < findBookings.length; i++) {
		const booking = findBookings[i].toJSON();
		const spotId = booking.Spot.id;

		let previewImage = await SpotImage.findOne({
			where: {
				[Op.and]: [{ preview: true }, { spotId }]
			}
		});
		if (previewImage) booking.Spot.previewImage = previewImage.url;

		Bookings.push(booking);
	}

	return res.json(Bookings);
});

module.exports = router;
