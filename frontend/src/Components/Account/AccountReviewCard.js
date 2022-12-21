import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/review';
import { useHistory } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const AccountReviewCard = ({ review }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [reviewContent, setReviewContent] = useState(review.review);
	const [stars, setStars] = useState(review.stars);
	const [hover, setHover] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [errors, setErrors] = useState({});

	const handleUpdateReview = async (e) => {
		e.preventDefault();
		setErrors({});

		const reviewInfoData = { review: reviewContent, stars };

		const UpdatedReview = await dispatch(
			reviewsActions.updateReview(reviewInfoData, review.id)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});

		if (UpdatedReview) {
			setUpdated(true);
			await dispatch(reviewsActions.getCurrentUserReviews());
		}
	};

	return (
		<>
			<div>
				You can edit your reviews directly on the card, just simply click on the
				text or stars to edit.
			</div>
			<form onSubmit={handleUpdateReview}>
				<div className="account-display-reviews">
					<div id="spot-name">
						<span className="account-review-title">Review for:</span>{' '}
						{review.Spot.name}
					</div>
					<div id="review-content-and-preview">
						<div id="review-rating">
							<div id="review-date">
								<span className="account-review-title">
									{updated ? 'Updated' : 'Made'} on:
								</span>{' '}
								{new Date(review.updatedAt).toDateString()}
							</div>
							<div>
								<span className="account-review-title">Rating:</span>{' '}
								<div>
									{[...Array(5)].map((star, i) => {
										const ratingValue = i + 1;
										return (
											<label
												key={i}
												className="account-page-review-stars-label"
											>
												<input
													className="account-page-review-stars"
													type="radio"
													name="rating"
													value={ratingValue}
													onClick={() => setStars(ratingValue)}
												/>
												<FaStar
													className="stars"
													class="fa-solid fa-star"
													color={
														ratingValue <= (hover || stars)
															? '#ffc107'
															: '#e4e5e9'
													}
													size={25}
													onMouseEnter={() => setHover(ratingValue)}
													onMouseLeave={() => setHover(null)}
												/>
											</label>
										);
									})}
								</div>
							</div>
							<div>
								<span className="account-review-title">Review content:</span>{' '}
								<br />
								<textarea
									className="account-page-review-textarea"
									value={reviewContent}
									onChange={(e) => setReviewContent(e.target.value)}
								/>
							</div>
						</div>
						<img
							className="account-page-review-image"
							onClick={() => history.push(`/spots/${review.Spot.id}`)}
							src={review.Spot.previewImage}
						/>
					</div>
					<div className="error-account-review">
						{<span>{errors.review ? errors.review : null}</span>}
					</div>
					<div className="delete-account-review">
						<button type="submit">Update</button>
						<button
							type="delete"
							onClick={async () => {
								if (
									window.confirm('Are you sure you want to delete this review?')
								) {
									await dispatch(reviewsActions.deleteReview(review.id));
									await dispatch(reviewsActions.getCurrentUserReviews());
								}
							}}
						>
							Delete review
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AccountReviewCard;
