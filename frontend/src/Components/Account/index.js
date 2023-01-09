import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/review';
import * as bookingsActions from '../../store/booking';
import * as spotActions from '../../store/spots';
import { useHistory } from 'react-router-dom';
import AccountReviewCard from './AccountReviewCard';
import AccountBookingCard from './AccountBookingCard';
import AccountPassBookingcard from './AccountPassBookingCard';
export default function Account() {
	const sessionUser = useSelector((state) => state.session.user);
	const userReviews = useSelector((state) => Object.values(state.reviews.user));
	const allSpots = useSelector((state) => state.spots.allSpots);
	const userBookings = useSelector((state) => state.bookings.userBookings);

	const [showReviews, setShowReviews] = useState(true);
	const [showBookings, setShowBookings] = useState(false);

	// filter out passed trips
	const [futureReservation, setFutureReservation] = useState([]);
	const [passReservation, setPassReservation] = useState([]);
	// Have this trip already taken place? if it has, it CAN NOT be EDITED.! using today date
	const todayDate = new Date().toJSON().slice(0, 10);
	const dispatch = useDispatch();
	useEffect(() => {
		const getData = async () => {
			await dispatch(reviewsActions.getCurrentUserReviews());
			await dispatch(spotActions.getAllSpots());
			const allBookings = await dispatch(bookingsActions.getUserBookings());
			let futureBooking = [];
			let passBookings = [];
			allBookings?.forEach((booking) => {
				const isFutureBooking =
					booking.startDate > todayDate && booking.endDate > todayDate;
				if (isFutureBooking) futureBooking.push(booking);
				else passBookings.push(booking);
			});
			setFutureReservation(futureBooking.reverse());
			setPassReservation(passBookings);
		};

		if (sessionUser && !Object.values(userBookings).length) getData();
	}, [sessionUser, userBookings]);

	const handleShowReviews = () => {
		setShowReviews(true);
		setShowBookings(false);
	};

	const handleShowBookings = () => {
		setShowReviews(false);
		setShowBookings(true);
	};

	return (
		<div className="account-page-wrapper">
			<h2>Account,</h2>
			{sessionUser && (
				<div className="account-info">
					<span id="first-last-name">
						{sessionUser?.firstName} {sessionUser?.lastName}
					</span>
					, <span id="email">{sessionUser?.email}.</span>
				</div>
			)}
			<div className="account-options">
				<div
					className={`account-reviews ${showReviews ? 'show' : ''}`}
					onClick={handleShowReviews}
				>
					Manage Reviews
				</div>
				<div
					className={`account-spots ${showBookings ? 'show' : ''}`}
					onClick={handleShowBookings}
				>
					Manage Bookings
				</div>
			</div>

			<div className="account-display-wrapper">
				{sessionUser && showReviews && (
					<>
						<div>
							You can edit your reviews directly on the card, just simply click
							on the text or stars to edit.
						</div>
						{userReviews?.map((review, i) => (
							<AccountReviewCard review={review} key={i} />
						))}
					</>
				)}
			</div>
			<div className="account-display-wrapper">
				{sessionUser && showBookings && (
					<>
						<div className="account-booking-title">
							<div>Trips</div>
							<div id="upcoming-reservation">Upcoming reservation</div>
						</div>
						{futureReservation?.map((booking, i) => (
							<AccountBookingCard booking={booking} key={i} />
						))}
						<div className="account-booking-title">
							<div id="upcoming-reservation">Where you've been</div>
						</div>
						<div className="account-display-pass-bookings">
							{passReservation?.map((booking, i) => (
								<AccountPassBookingcard booking={booking} key={i} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
