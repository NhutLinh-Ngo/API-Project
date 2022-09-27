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

// Edit a booking
router.put('/:bookingId', authentication, async (req, res, next) => {
	const bookingId = parseInt(req.params.bookingId);
	const { startDate, endDate } = req.body;
	const userId = req.user.id;

	const foundBooking = await Booking.findByPk(bookingId);

	if (foundBooking) {
		// UNAuthorized user
		if (foundBooking.userId !== userId) {
			return res.status(403).json({
				message: 'Forbidden',
				statusCode: 403
			});
		}
		// console.log(foundBooking);
		// cannot edit booking in the past
		let todayDate = new Date();
		if (foundBooking.endDate <= todayDate) {
			return res.status(403).json({
				message: "Past bookings can't be modified",
				statusCode: 403
			});
		}

		// checking other booking date for conflicting dates
		const spot = await Spot.findByPk(foundBooking.spotId);
		const bookings = await spot.getBookings({
			where: {
				[Op.not]: {
					startDate: foundBooking.startDate
				}
			}
		});
		for (let i = 0; i < bookings.length; i++) {
			let booking = bookings[i];

			// conflicting start date
			if (
				// start date between existing booking dates || startDate starts on existing start/end date
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
				// end date between existing booking dates || endDate ends on existing start/end date
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

		try {
			if (startDate >= endDate) {
				const error = new Error('endDate cannot come before startDate');
				error.title = 'validation Error';
				error.status = 403;
				return next(error);
			}
			await foundBooking.update({
				startDate,
				endDate
			});

			return res.json(foundBooking);
		} catch (error) {
			error.status = 403;
			return next(error);
		}
	}

	// no Spot found with given Id
	return res.status(404).json({
		message: "Booking couldn't be found",
		statusCode: 404
	});
});

// Delete Booking
router.delete('/:bookingId', authentication, async (req, res, next) => {
	const bookingId = parseInt(req.params.bookingId);
	const userId = req.user.id;
	let todayDate = new Date();

	const foundBooking = await Booking.findByPk(bookingId, {
		include: {
			model: Spot,
			attributes: ['ownerId']
		}
	});

	if (foundBooking) {
		if (
			todayDate >= foundBooking.startDate &&
			todayDate <= foundBooking.endDate
		) {
			return res.status(403).json({
				message: "Bookings that have been started can't be deleted",
				statusCode: 403
			});
		}
		if (foundBooking.userId == userId || foundBooking.Spot.ownerId == userId) {
			await foundBooking.destroy();

			return res.json({
				message: 'Successfully deleted',
				statusCode: 200
			});
		}
	}
	// no Spot found with given Id
	return res.status(404).json({
		message: "Booking couldn't be found",
		statusCode: 404
	});
});
module.exports = router;
