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
	SingleSpots: {}
};
//todo: define TYPES
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT_DETAILS = '/spots/LOAD_SINGLE_SPOT_DETAILS';
const CLEAN_UP_SINGLE_SPOT = 'spots/CLEAN_UP_SINGLE_SPOT';
const CLEAR_UP_ALL_SPOTS = 'spots/CLEAR_UP_ALL_SPOTS';

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

export const cleanUpSingleSpot = () => {
	return {
		type: CLEAN_UP_SINGLE_SPOT
	};
};
export const cleanUpAllSpots = () => {
	return {
		type: CLEAR_UP_ALL_SPOTS
	};
};
// todo: define THUNKS
// Spots Thunks
export const getAllSpots = () => async (dispatch) => {
	const res = await fetch('/api/spots');

	if (res.ok) {
		const spotsData = await res.json();
		const normalizedSpots = normalizeData(spotsData.Spots);
		dispatch(loadSpots(normalizedSpots));
		return spotsData.Spots;
	}
};

export const getDetailsOfSpot = (spotId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${spotId}`);

	if (res.ok) {
		const spotData = await res.json();
		dispatch(loadSingleSpots(spotData));
	}
};

export const CreateNewSpot = (spotInfo) => async (dispatch) => {
	const res = await csrfFetch('/api/spots', {
		method: 'POST',
		body: JSON.stringify(spotInfo)
	});

	if (res.ok) {
		const newSpotData = await res.json();
		// dispatch(addSpot(newSpotData));
		return newSpotData;
	}
};

export const UpdateSpot = (spotInfo, spotId) => async () => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'PUT',
		body: JSON.stringify(spotInfo)
	});

	const UpdatedSpot = await res.json();
	return UpdatedSpot;
};

export const DeleteSpot = (spotId) => async () => {
	return await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE'
	});
};

// Images
export const AddImageToSpot = (imageInfo, spotId) => async (dispatch) => {
	const { url, preview } = imageInfo;
	console.log(url, 'asdfasdfasdfasdf');
	const formData = new FormData();
	formData.append('image', url);
	formData.append('preview', preview);
	const res = await csrfFetch(`/api/spots/${spotId}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: formData
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data, 'asdfasdfasdfasdfsd');
		return data;
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
		case CLEAN_UP_SINGLE_SPOT:
			spotsState.SingleSpots = {};
			return spotsState;
		case CLEAR_UP_ALL_SPOTS:
			spotsState.AllSpots = {};
			return spotsState;
		default:
			return state;
	}
};

export default spotsReducer;
