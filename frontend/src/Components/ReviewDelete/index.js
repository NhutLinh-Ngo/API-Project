import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/review';
import * as spotsActions from '../../store/spots';
import './ReviewDelete.css';

export default function DeleteReview({ reviewId, spotId }) {
	const dispatch = useDispatch();

	const handledeleteReview = async () => {
		await dispatch(reviewsActions.deleteReview(reviewId));
		await dispatch(reviewsActions.getReviewsBySpotId(spotId));
		await dispatch(spotsActions.getDetailsOfSpot(spotId));
	};
	return (
		<button
			className="delete-review"
			type="button"
			onClick={handledeleteReview}
		>
			Delete Review
		</button>
	);
}
