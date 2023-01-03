import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { useHistory } from 'react-router-dom';

const AccountBookingCard = ({ booking }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => state.spots.AllSpots);

	useEffect(() => {
		if (!Object.values(allSpots).length) dispatch(spotActions.getAllSpots());
	}, []);

	const thisSpot = allSpots[booking.Spot.id];
	const startDate = new Date(
		booking.startDate.replace('-', '/')
	).toDateString();
	const startMonth = startDate.slice(4, 7);
	const startDay = startDate.slice(8, 10);
	const endDate = new Date(booking.endDate.replace('-', '/')).toDateString();
	const endMonth = endDate.slice(4, 7);
	const endDay = endDate.slice(8, 10);

	const tripDate =
		startMonth == endMonth
			? `${startMonth} ${startDay} - ${endDay}`
			: `${startDate.slice(4, 10)} - ${endDate.slice(4, 10)}`;

	const todayDate = new Date().toJSON().slice(0, 10);
	const canEdit = booking.startDate > todayDate && booking.endDate > todayDate;
	return (
		<div className="account-display-bookings">
			<div id="account-booking-date-info">
				<div id="your-trip">Your Trip</div>
				<div id="booking-dates">Dates</div>
				<div id="booking-date">{tripDate}</div>
				{canEdit && <div className="account-booking-edit-button">Edit</div>}
			</div>
			<div className="account-page-booking-image-wrapper">
				<img
					className="account-page-booking-image"
					onClick={() => history.push(`/spots/${booking.Spot.id}`)}
					src={booking.Spot.previewImage}
				/>
				<div id="spot-name">
					<div>{booking.Spot.name}</div>
					<div id="account-page-total-review">
						<i class="fa-solid fa-star"></i>
						{thisSpot?.avgRating}{' '}
						<p id="account-page-how-many-reviews">(reviews)</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountBookingCard;
