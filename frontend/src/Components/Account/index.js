import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/review';
import * as bookingsActions from '../../store/booking';
import { useHistory } from 'react-router-dom';
import AccountReviewCard from './AccountReviewCard';
import AccountBookingCard from './AccountBookingCard';
export default function Account() {
	const sessionUser = useSelector((state) => state.session.user);
	const userReviews = useSelector((state) => Object.values(state.reviews.user));
	const userBookings = useSelector((state) =>
		Object.values(state.bookings.userBookings)
	);
	const [showReviews, setShowReviews] = useState(true);
	const [showBookings, setShowBookings] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (sessionUser) {
			dispatch(reviewsActions.getCurrentUserReviews());
			dispatch(bookingsActions.getUserBookings());
		}
	}, [dispatch, sessionUser]);

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
				{sessionUser &&
					showBookings &&
					userBookings?.map((booking, i) => (
						<AccountBookingCard booking={booking} key={i} />
					))}
			</div>
		</div>
	);
}
