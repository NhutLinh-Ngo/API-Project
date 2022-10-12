import { csrfFetch } from './csrf';

//initialize user state
const initialState = { user: null };

// define types
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// actions

const setUser = (user) => {
	return {
		type: SET_USER,
		user
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER
	};
};

// thunks
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;

	const res = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password
		})
	});

	const data = await res.json();
	dispatch(setUser(data));
	return res;
};

// reducer
const sessionReducer = (state = initialState, action) => {
	Object.freeze(state);
	const sessionState = { ...state };

	switch (action.type) {
		case SET_USER:
			sessionState.user = action.user;
			return sessionState;
		case REMOVE_USER:
			sessionState.user = null;
			return sessionState;
		default:
			return state;
	}
};

export default sessionReducer;
