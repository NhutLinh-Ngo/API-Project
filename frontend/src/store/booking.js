import { csrfFetch } from './csrf';

// normalize data
const normalizeData = (data) => {
	const obj = {};

	data.forEach((item) => (obj[item.id] = item));

	return obj;
};

// initialize spots state
const initialState = {
	singleSpotBookings: {},
	userBookings: {}
};

const GET_SPOT_BOOKING = 'bookings/GET_SPOT_BOOKING';
const CLEAR_SPOT_BOOKINGS = 'bookings/CLEAR_SINGLE_SPOT_BOOKINGS';
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOOKINGS';
const CLEAR_USER_BOOKING = 'bookings/CLEAR_USER_BOOKING';

const loadSpotBooking = (bookings) => ({
	type: GET_SPOT_BOOKING,
	bookings
});
const loadUserBooking = (bookings) => ({
	type: GET_USER_BOOKINGS,
	bookings
});
export const clearSpotBookings = () => ({
	type: CLEAR_SPOT_BOOKINGS
});

export const clearUserBookings = () => ({
	type: CLEAR_USER_BOOKING
});

export const getSpotBookings = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

	if (res.ok) {
		const bookingData = await res.json();
		dispatch(loadSpotBooking(bookingData.Bookings));
		return bookingData.Bookings;
	}
};

export const getUserBookings = () => async (dispatch) => {
	const res = await csrfFetch('/api/bookings/current');

	if (res.ok) {
		const userBookings = await res.json();
		dispatch(loadUserBooking(userBookings.Bookings));
		return userBookings.Bookings;
	}
};
export const createBooking = (spotId, bookingDate) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
		method: 'POST',
		body: JSON.stringify(bookingDate)
	});

	if (res.ok) {
		const BookedDate = await res.json();
		return BookedDate;
	}
};

export const editBooking = (bookingId, bookingDate) => async () => {
	const res = await csrfFetch(`/api/bookings/${bookingId}`, {
		method: 'PUT',
		body: JSON.stringify(bookingDate)
	});

	if (res.ok) {
		const editedDate = await res.json();
		return editedDate;
	}
};

export const deleteBooking = (bookingId) => async () => {
	const res = await csrfFetch(`/api/bookings/${bookingId}`, {
		method: 'DELETE'
	});
	const deleteRes = await res.json();
	return deleteRes;
};

const BookingReducer = (state = initialState, action) => {
	Object.freeze(state);
	const bookingsState = { ...state };

	switch (action.type) {
		case GET_SPOT_BOOKING:
			const obj = {};
			// action.bookings.forEach((booking) => (obj[booking.spotId] = booking));
			bookingsState.singleSpotBookings = action.bookings;
			return bookingsState;
		case CLEAR_SPOT_BOOKINGS:
			bookingsState.singleSpotBookings = {};
			return bookingsState;
		case GET_USER_BOOKINGS:
			bookingsState.userBookings = normalizeData(action.bookings);
			return bookingsState;
		case CLEAR_USER_BOOKING:
			bookingsState.userBookings = {};
			return bookingsState;
		default:
			return state;
	}
};

export default BookingReducer;
