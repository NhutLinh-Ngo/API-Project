import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/review';
import { useHistory } from 'react-router-dom';
export default function Account() {
	const sessionUser = useSelector((state) => state.session.user);
	const userReviews = useSelector((state) => Object.values(state.reviews.user));
	const [showReviews, setShowReviews] = useState(true);
	const [showSpots, setShowSpots] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
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
						<form>
							<div className="account-display-reviews">
								<div id="spot-name">
									<span className="account-review-title">Review for:</span>{' '}
									{review.Spot.name}
								</div>
								<div id="review-content-and-preview">
									<div id="review-rating">
										<div id="review-date">
											<span className="account-review-title">Made on:</span>{' '}
											{new Date(review.createdAt).toDateString()}
										</div>
										<div>
											<span className="account-review-title">Rating:</span>{' '}
											<input
												value={review.stars}
												style={{ width: '25px', border: 'none' }}
												type="number"
												min={1}
												max={5}
												onChange={(e) => (review.stars = e.target.value)}
											/>{' '}
											<i class="fa-solid fa-star"></i>
										</div>
										<div>
											<span className="account-review-title">
												Review content:
											</span>{' '}
											<br />
											<textarea
												value={review.review}
												style={{
													resize: 'none',
													width: '336px',
													height: '85px',
													border: '1px solid rgb(208,208,208)',
													borderRadius: '10px',
													padding: '3px'
												}}
											/>
										</div>
									</div>
									<img
										onClick={() => history.push(`/spots/${review.Spot.id}`)}
										src={review.Spot.previewImage}
										style={{
											height: '90px',
											width: '180px',
											cursor: 'pointer'
										}}
									/>
								</div>
								{}
								<div className="delete-account-review">
									<span>Update</span>
									<span
										onClick={async () => {
											if (
												window.confirm(
													'Are you sure you want to delete this review?'
												)
											) {
												await dispatch(reviewsActions.deleteReview(review.id));
												await dispatch(reviewsActions.getCurrentUserReviews());
											}
										}}
									>
										Delete review
									</span>
								</div>
							</div>
						</form>
					))}
			</div>
		</div>
	);
}
