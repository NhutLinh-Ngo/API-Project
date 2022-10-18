import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsBySpotId } from '../../store/review';
import { Modal } from '../../context/Modal';
import useModalVariableContext from '../../context/ModalShowVariable';
import SpotReviewForm from '../SpotReviewFormModal';
import './SpotReviews.css';
export default function SpotReviews({ spot }) {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
	const sessionUser = useSelector((state) => state.session.user);

	const { showModalReview, setShowModalReview } = useModalVariableContext();

	useEffect(() => {
		dispatch(getReviewsBySpotId(spotId));
	}, [dispatch]);

	if (!spotReviews) return null;

	let allowReview = false;
	if (sessionUser && sessionUser.id !== spot.Owner.id) allowReview = true;
	return (
		<div className="spot-reviews-wrapper" id="all-reviews">
			<div className="review-title">
				{/* Empty star if no review Yet */}
				{spot.avgStarRating ? (
					<i class="fa-solid fa-star"></i>
				) : (
					<i class="fa-regular fa-star"></i>
				)}{' '}
				{spot.avgStarRating
					? spot.avgStarRating
					: 'Be the first to review this place!'}{' '}
				• {spot.numReviews} reviews
			</div>
			{allowReview && (
				<button
					type="button"
					className="create-new-review"
					onClick={() => setShowModalReview(true)}
				>
					{' '}
					Write a review
				</button>
			)}
			{showModalReview && (
				<Modal onClose={() => setShowModalReview(false)}>
					<SpotReviewForm />
				</Modal>
			)}
			<div className="reviews-wrapper">
				{spotReviews?.map((review, i) => (
					<div className="review-wrapper" key={i}>
						<div className="review-row1">
							<img
								src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-User-virtual-keyboard-others-inmotus-design-6.png"
								style={{ height: '50px', width: '50px' }}
							/>
							<div className="review-name-date">
								<div className="reviewer-name">{review.User.firstName}</div>
								<div className="review-date">
									{new Date(review.createdAt)
										.toDateString()
										.split(' ')
										.filter((el, i) => i % 2 !== 0)
										.join(' ')}
								</div>
							</div>
						</div>
						<div className="review-row2">{review.review}</div>
					</div>
				))}
			</div>
		</div>
	);
}
