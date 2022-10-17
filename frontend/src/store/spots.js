import { csrfFetch } from './csrf';

// normalize data

const normalizeData = (data) => {
	const obj = {};

	data.forEach((item) => (obj[item.id] = item));

	return obj;
};

// initialize spots state
const initialState = {
	AllSpots: {},
	SingleSpots: {
		//spotdata,
		SpotImages: [],
		Owner: {}
	}
};
//todo: define TYPES
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT_DETAILS = '/spots/LOAD_SINGLE_SPOT_DETAILS';

//todo: define ACTIONS
const loadSpots = (allSpots) => {
	return {
		type: LOAD_SPOTS,
		allSpots
	};
};

const loadSingleSpots = (spot) => {
	return {
		type: LOAD_SINGLE_SPOT_DETAILS,
		spot
	};
};
// todo: define THUNKS
export const getAllSpots = () => async (dispatch) => {
	const res = await fetch('/api/spots');

	if (res.ok) {
		const spotsData = await res.json();
		const normalizedSpots = normalizeData(spotsData.Spots);
		dispatch(loadSpots(normalizedSpots));
	}
};

export const getDetailsOfSpot = (spotId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${spotId}`);

	if (res.ok) {
		const spotData = await res.json();
		dispatch(loadSingleSpots(spotData));
	}
};
//todo: define REDUCER
const spotsReducer = (state = initialState, action) => {
	Object.freeze(state);
	const spotsState = { ...state };
	switch (action.type) {
		case LOAD_SPOTS:
			spotsState.AllSpots = action.allSpots;
			return spotsState;
		case LOAD_SINGLE_SPOT_DETAILS:
			spotsState.SingleSpots = action.spot;
			return spotsState;
		default:
			return state;
	}
};

export default spotsReducer;
