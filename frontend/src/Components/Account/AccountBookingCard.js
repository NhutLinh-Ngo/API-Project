import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import * as bookingActions from '../../store/booking';
import { NavLink, useHistory } from 'react-router-dom';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import { Modal } from '../../context/Modal';
function currencyFormat(num) {
	return num.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
}
const AccountBookingCard = ({ booking }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => state.spots.AllSpots);

	const [showCalendarModal, setShowCalendarModal] = useState(false);
	const thisSpot = allSpots[booking.Spot.id];
	const startDate = new Date(booking.startDate.replace('-', '/'));
	const startMonth = startDate.toDateString().slice(4, 7);
	const startDay = startDate.toDateString().slice(8, 10);
	const endDate = new Date(booking.endDate.replace('-', '/'));
	const endMonth = endDate.toDateString().slice(4, 7);
	const endDay = endDate.toDateString().slice(8, 10);

	// edit booking state

	const [serviceFee, setServiceFee] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [priceBeforeFee, setPriceBeforeFee] = useState(0);
	const [tax, setTax] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const [bookingDetails, setBookingDetails] = useState(false);
	const [availabilityButton, setAvailabilityButton] = useState('');
	const [showConfirmedEditBookingModal, setShowCofirmedEditBookingModal] =
		useState(false);

	// checking to see if the trip is within the same Month if it is the format
	// should be: Jan 01 - 10, else Jan 01 - Feb 01
	const tripDate =
		startMonth == endMonth
			? `${startMonth} ${startDay} - ${endDay}`
			: `${startDate.toDateString().slice(4, 10)} - ${endDate
					.toDateString()
					.slice(4, 10)}`;

	// Have this trip already taken place? if it has, it CAN NOT be EDITED.! using today date
	const todayDate = new Date().toJSON().slice(0, 10);
	const canEdit = booking.startDate > todayDate && booking.endDate > todayDate;

	//calendar booking dates
	const [bookingDates, setBookingDates] = useState([startDate, endDate]);

	//load all spot if it is not present
	useEffect(() => {
		if (!Object.values(allSpots).length) dispatch(spotActions.getAllSpots());
	}, []);

	useEffect(() => {
		if (showCalendarModal) {
			// appending the calendar to the modal div
			const div = document.getElementById('booking-edit-modal');
			const calendar = document.getElementsByClassName('booking-edit-calendar');

			div.append(calendar[0]);

			//add check-in and check-in label to booking input box
			const box = document.getElementsByClassName(
				'react-daterange-picker__inputGroup'
			);
			const checkIn = document.createElement('div');
			const checkOut = document.createElement('div');
			checkIn.classList.add('date-checkin-label');
			checkOut.classList.add('date-checkin-label');

			// add checkout out checkin work into input box
			const contentCheckIn = document.createTextNode('CHECK-IN');
			const contentCheckOut = document.createTextNode('CHECK-OUT');
			checkIn.appendChild(contentCheckIn);
			checkOut.appendChild(contentCheckOut);
			box[0].prepend(checkIn);
			box[1].prepend(checkOut);

			// taking the clear date button from calendar and moving it to the bottom of the modal.
			const calendarModalDiv = document.getElementById('booking-edit-modal');
			const clearDateButton = document.getElementById('clear-date-button');
			calendarModalDiv.append(clearDateButton);
		}
	}, [showCalendarModal]);

	// BOOKINGS
	// Load spot bookings
	const [spotBookings, setSpotBookings] = useState([]);
	const [selectedStartDate, setSelectedStartdate] = useState('');
	//error state
	const [errors, setErrors] = useState({});
	useEffect(() => {
		const getBookings = async () => {
			// fetch to get all bookings
			let bookings = await dispatch(
				bookingActions.getSpotBookings(thisSpot.id)
			);

			// filter out all booked Date, excluding editting date
			bookings = bookings.filter((bookedDate) => bookedDate.id !== booking.id);

			// extract only start and end date for easy of use.
			bookings = bookings.map((booking) => [
				booking.startDate,
				booking.endDate
			]);
			// set spot booked date to state.
			setSpotBookings(bookings);
		};

		if (thisSpot) getBookings();

		return () => dispatch(bookingActions.clearSpotBookings());
	}, [thisSpot]);

	//Set booking details once date have been selected
	useEffect(() => {
		if (bookingDates && thisSpot) {
			const totalStay = Math.floor(
				(new Date(bookingDates[1]) - new Date(bookingDates[0])) / 86400000
			);
			const priceBeforeFee = parseInt(thisSpot.price * totalStay);
			const serviceFee = parseInt(
				(thisSpot.price * totalStay * 0.145).toFixed(0)
			);
			const totalPrice = serviceFee + priceBeforeFee + 300;
			const taxes = totalPrice * 0.15;
			const grandTotal = totalPrice + taxes;
			setPriceBeforeFee(currencyFormat(priceBeforeFee));
			setServiceFee(currencyFormat(serviceFee));
			setTotalPrice(currencyFormat(totalPrice));
			setTax(currencyFormat(taxes));
			setGrandTotal(currencyFormat(grandTotal));
		} else {
			setBookingDetails(false);
		}
	}, [bookingDates]);

	//getting the number of nights based on selected Dates
	const totalStay = bookingDates
		? Math.floor(
				(new Date(bookingDates[1]) - new Date(bookingDates[0])) / 86400000
		  ) + ' nights'
		: 'Select dates';

	// format calander date
	const formatDate = (date, key) => {
		const day = new Date(date).toDateString().toString();
		return day.split(' ')[0].split('').slice(0, 2).join('');
	};

	const handleEditBooking = async (e) => {
		e.preventDefault();
		if (bookingDates) {
			const startDate = new Date(bookingDates[0])
				.toJSON()
				.slice(0, 10)
				.toString();
			let endDate = new Date(bookingDates[1]);
			endDate.setHours(endDate.getHours() - 23);
			endDate = new Date(endDate).toJSON().slice(0, 10).toString();

			const bookingInfo = { startDate, endDate };
			const editedBooking = await dispatch(
				bookingActions.editBooking(booking.id, bookingInfo)
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});

			if (editedBooking) {
				setShowCalendarModal(false);
				setShowCofirmedEditBookingModal(true);
			}
		}
	};

	const handleCancelTrip = async (e) => {
		e.preventDefault();
		if (window.confirm('Do you wish to cancel this trip?')) {
			await dispatch(bookingActions.deleteBooking(booking.id));
			await dispatch(bookingActions.clearUserBookings());
			await dispatch(bookingActions.getUserBookings());
		}
	};
	return (
		<>
			<div className="account-display-bookings">
				<div id="account-booking-date-info">
					<div id="your-trip">Your Trip</div>
					<div id="booking-dates">Dates</div>
					<div id="booking-date">
						{tripDate}{' '}
						{canEdit && (
							<div
								className="account-booking-edit-button"
								onClick={() => setShowCalendarModal(true)}
							>
								Edit
							</div>
						)}
					</div>
					{canEdit && (
						<div
							className="account-booking-edit-button"
							onClick={handleCancelTrip}
						>
							Cancel this Trip
						</div>
					)}
				</div>
				<div className="account-page-booking-image-wrapper">
					<img
						className="account-page-booking-image"
						onClick={() => history.push(`/spots/${booking.Spot.id}`)}
						src={booking.Spot.previewImage}
					/>
					<div id="spot-name">
						<div>{booking.Spot.name}</div>
						<div id="account-page-total-review">
							<i class="fa-solid fa-star"></i>
							{thisSpot?.avgRating}{' '}
							<p id="account-page-how-many-reviews">(reviews)</p>
						</div>
					</div>
				</div>
			</div>
			{showCalendarModal && (
				<Modal
					onClose={() => {
						setShowCalendarModal(false);
						setBookingDates([startDate, endDate]);
						setSelectedStartdate('');
					}}
				>
					{!showConfirmedEditBookingModal && (
						<div id="booking-edit-modal">
							<div id="booking-edit-top-row">
								<div id="total-night-stay">{totalStay}</div>
								<DateRangePicker
									onChange={setBookingDates}
									value={bookingDates}
									minDate={new Date()}
									isOpen={true}
									rangeDivider={false}
									showDoubleView={true}
									monthPlaceholder={'mm'}
									yearPlaceholder={'yyyy'}
									dayPlaceholder={'dd'}
									showNeighboringMonth={false}
									clearIcon={
										<button id="clear-date-button">Clear dates</button>
									}
									goToRangeStartOnSelect={false}
									showFixedNumberOfWeeks={false}
									onClickDay={(value, event) => {
										if (selectedStartDate) setSelectedStartdate('');
										else
											setSelectedStartdate(
												value.toJSON().slice(0, 10).toString()
											);
									}}
									tileDisabled={({ activeStartDate, date, view }) => {
										let currDate = date.toJSON().slice(0, 10).toString();
										if (currDate <= new Date().toJSON().slice(0, 10))
											return true;
										for (let i = 0; i < spotBookings.length; i++) {
											let bookingDate = spotBookings[i];
											if (
												bookingDate[0] <= currDate &&
												bookingDate[1] >= currDate
											)
												return true;

											if (selectedStartDate) {
												if (selectedStartDate > currDate) return true;
												if (
													bookingDate[0] > selectedStartDate &&
													currDate > bookingDate[0]
												)
													return true;
											}
										}
									}}
									view={'month'}
									formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
									calendarClassName="booking-edit-calendar"
									className="booking-edit-dateranger-picker"
								/>
							</div>
							<div
								className={`${
									bookingDates ? '' : 'disable-edit-button'
								} save-edit-booking`}
								onClick={handleEditBooking}
							>
								Save
							</div>
						</div>
					)}
				</Modal>
			)}
			{showConfirmedEditBookingModal && (
				<Modal onClose={() => setShowCofirmedEditBookingModal(false)}>
					<div className="confirmed-booking-modal-wrapper">
						<div id="congrat-div">Congratulation, your trip is confirmed!</div>
						<div className="comfirmed-booking-modal-content-wrapper">
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">Dates</div>
								<div>
									{new Date(bookingDates[0]).toDateString().slice(0, 10)} -{' '}
									{new Date(bookingDates[1]).toDateString().slice(0, 10)},{' '}
									{new Date(bookingDates[1]).toDateString().slice(-4)}
								</div>
							</div>
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">
									Price details
								</div>
								<div className="fees-wrapper">
									<div>
										${thisSpot.price} x {totalStay} nights
									</div>
									<div>{priceBeforeFee}</div>
								</div>
								<div className="fees-wrapper">
									<div>Cleaning fee</div>
									<div>$300</div>
								</div>
								<div className="fees-wrapper">
									<div>Service fee</div>
									<div>{serviceFee}</div>
								</div>
								<div className="fees-wrapper serviceFee">
									<div>Taxes</div>
									<div>{tax}</div>
								</div>
								<div className="total-price-wrapper">
									<div className="total-title">Total (USD): </div>
									<div className="total">{grandTotal}</div>
								</div>
								<div>
									You can manage all your trips in the{' '}
									<NavLink to="/account">account</NavLink> page.
								</div>
								<div
									className="confirmed-trip-modal-done-button"
									onClick={async () => {
										await dispatch(bookingActions.clearUserBookings());
										await dispatch(bookingActions.getUserBookings());
										setShowCofirmedEditBookingModal(false);
									}}
								>
									Done
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default AccountBookingCard;
