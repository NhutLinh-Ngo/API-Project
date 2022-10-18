import { csrfFetch } from './csrf';

// normalize data

const normalizeData = (data) => {
	const obj = {};

	data.forEach((item) => (obj[item.id] = item));

	return obj;
};

// initialize review stat
const initialState = {
	// When on a single spot, use the spot slice.
	spot: {},
	user: {}
};

// todo: define TYPES

const LOAD_SPOT_REVIEW = 'spot/LOAD_SPOT_REVIEW';

// todo: define ACTIONS

const loadSpotReviews = (reviews) => {
	return {
		type: LOAD_SPOT_REVIEW,
		reviews
	};
};

// todo: define THUNKS

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${spotId}/reviews`);

	if (res.ok) {
		const spotReviews = await res.json();
		const normalizeSpotReviews = normalizeData(spotReviews.Reviews);
		dispatch(loadSpotReviews(normalizeSpotReviews));
	}
};

export const postReview = (review, spotId) => async () => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		body: JSON.stringify(review)
	});

	const newReview = await res.json();
	return newReview;
};

export const deleteReview = (reviewId) => async () => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: 'DELETE'
	});

	const deleteRes = await res.json();
	return deleteRes;
};
// todo: Review Reducer
const ReviewsReducer = (state = initialState, action) => {
	Object.freeze(state);
	const reviewsState = { ...state };
	switch (action.type) {
		case LOAD_SPOT_REVIEW:
			reviewsState.spot = action.reviews;
			return reviewsState;
		default:
			return state;
	}
};

export default ReviewsReducer;
