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

//todo: define ACTIONS
const loadSpots = (allSpots) => {
	return {
		type: LOAD_SPOTS,
		allSpots
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

//todo: define REDUCER
const spotsReducer = (state = initialState, action) => {
	Object.freeze(state);
	const spotsState = { ...state };
	switch (action.type) {
		case LOAD_SPOTS:
			spotsState.AllSpots = action.allSpots;
			return spotsState;
		default:
			return state;
	}
};

export default spotsReducer;
