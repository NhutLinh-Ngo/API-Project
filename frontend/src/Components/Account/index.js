import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/review';
import { useHistory } from 'react-router-dom';
import AccountReviewCard from './AccountReviewCard';
export default function Account() {
	const sessionUser = useSelector((state) => state.session.user);
	const userReviews = useSelector((state) => Object.values(state.reviews.user));
	const [showReviews, setShowReviews] = useState(true);
	const [showSpots, setShowSpots] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reviewsActions.getCurrentUserReviews());
	}, [dispatch]);

	const handleShowReviews = () => {
		setShowReviews(true);
		setShowSpots(false);
	};

	const handleShowSpots = () => {
		setShowReviews(false);
		setShowSpots(true);
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
					className={`account-spots ${showSpots ? 'show' : ''}`}
					onClick={handleShowSpots}
				>
					Manage Spots
				</div>
			</div>

			<div className="account-display-wrapper">
				{sessionUser &&
					showReviews &&
					userReviews?.map((review, i) => (
						<AccountReviewCard review={review} key={i} />
					))}
			</div>
		</div>
	);
}
