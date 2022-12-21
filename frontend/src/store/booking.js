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

const loadSpotBooking = (bookings) => ({
	type: GET_SPOT_BOOKING,
	bookings
});

export const getSpotBookings = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

	if (res.ok) {
		const bookingData = await res.json();
		dispatch(loadSpotBooking(bookingData.Bookings));
	}
};

const BookingReducer = (state = initialState, action) => {
	Object.freeze(state);
	const bookingsState = { ...state };

	switch (action.type) {
		case GET_SPOT_BOOKING:
			const obj = {};
			action.bookings.forEach((booking) => (obj[booking.spotId] = booking));
			return obj;
		default:
			return state;
	}
};

export default BookingReducer;
