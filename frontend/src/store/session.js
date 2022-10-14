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

export const removeUser = () => {
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
	dispatch(setUser(data.user));
	return res;
};

export const signup = (user) => async (dispatch) => {
	const { firstName, lastName, username, email, password } = user;

	const res = await csrfFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			username,
			password
		})
	});

	const data = await res.json();
	dispatch(setUser(data.user));
	return res;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE'
	});
	dispatch(removeUser());
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();

	if (!data.user) return;
	dispatch(setUser(data.user));
	return response;
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
