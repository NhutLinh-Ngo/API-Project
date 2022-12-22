import React from 'react';
import './SingleSpotDetails.css';
import DateRangePicker, {
	CalendarIcon
} from '@wojtekmaj/react-daterange-picker';
import * as bookingActions from '../../store/booking';
import { useState } from 'react';
import './SingleSpotDetails.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SpotDetailsBody({ spot, name }) {
	const dispatch = useDispatch();
	const [bookingDates, setStartDate] = useState('');
	const [selectedStartDate, setSelectedStartdate] = useState('');
	const [spotBookings, setSpotBookings] = useState([]);
	const [serviceFee, setServiceFee] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [priceBeforeFee, setPriceBeforeFee] = useState(0);
	const [totalStay, setTotalStay] = useState(0);
	const [bookingDetails, setBookingDetails] = useState(false);
	const [availabilityButton, setAvailabilityButton] = useState('');

	const [haveDateSelected, setHaveDateSelected] = useState(true);
	const [calendarOpened, setCalendarOpened] = useState(false);

	// Load spot bookings
	useEffect(() => {
		const getBookings = async () => {
			let bookings = await dispatch(bookingActions.getSpotBookings(spot.id));
			bookings = bookings.map((booking) => [
				booking.startDate,
				booking.endDate
			]);
			setSpotBookings(bookings);
		};

		getBookings();
		return () => dispatch(bookingActions.clearSpotBookings());
	}, []);

	//add check-in and check-in label to booking input box
	useEffect(() => {
		const box = document.getElementsByClassName(
			'react-daterange-picker__inputGroup'
		);
		const checkIn = document.createElement('div');
		const checkOut = document.createElement('div');
		checkIn.classList.add('date-checkin-label');
		checkOut.classList.add('date-checkin-label');

		const contentCheckIn = document.createTextNode('CHECK-IN');
		const contentCheckOut = document.createTextNode('CHECK-OUT');
		checkIn.appendChild(contentCheckIn);
		checkOut.appendChild(contentCheckOut);
		box[0].prepend(checkIn);
		box[1].prepend(checkOut);
	}, []);

	// add onclick function to datePickWrapper
	useEffect(() => {
		const dateRangeWrapper = document.getElementsByClassName(
			'react-daterange-picker__wrapper'
		);
	}, []);
	//Set booking details once date have been selected
	useEffect(() => {
		if (bookingDates) {
			setBookingDetails(true);
			setHaveDateSelected(false);
			const totalStay =
				new Date(bookingDates[1].getDate()) -
				new Date(bookingDates[0]).getDate();
			const priceBeforeFee = parseInt(spot.price * totalStay);
			const serviceFee = parseInt((spot.price * totalStay * 0.145).toFixed(0));
			const totalPrice = serviceFee + priceBeforeFee + 300;
			setPriceBeforeFee(priceBeforeFee);
			setServiceFee(serviceFee);
			setTotalPrice(totalPrice);
			setTotalStay(totalStay);
		} else {
			setBookingDetails(false);
			setPriceBeforeFee(0);
			setServiceFee(0);
			setTotalPrice(0);
			setTotalStay(0);
			setHaveDateSelected(true);
		}
	}, [bookingDates]);

	// move the open calendar button into a different place.
	useEffect(() => {
		if (haveDateSelected) {
			let calendarButton = document.getElementById('show-calendar-button');
			const newLocationForButton = document.getElementById('show-calendar-div');
			if (!availabilityButton) setAvailabilityButton(calendarButton);
			calendarButton = availabilityButton ? availabilityButton : calendarButton;
			newLocationForButton.append(calendarButton);
		} else {
			const newLocationForButton = document.getElementById('show-calendar-div');
			while (newLocationForButton.lastElementChild) {
				newLocationForButton.removeChild(newLocationForButton.lastElementChild);
			}
		}
	}, [haveDateSelected]);

	useEffect(() => {
		if (calendarOpened) {
			const calendarDiv = document.getElementsByClassName('react-calendar');
			const clearDateButton = document.getElementById('clear-date-button');
			calendarDiv[0].append(clearDateButton);
			console.log(calendarDiv[0], clearDateButton);
		}
	}, [calendarOpened]);
	// // click event listener to close down calendar when clicked on
	// useEffect(() => {
	// 	if (!showMenu) return;

	// 	const calendar = document.getElementsByClassName(
	// 		'react-daterange-picker__calendar'
	// 	);
	// 	const calendar1 = document.getElementsByClassName('react-daterange-picker');
	// 	console.log(calendar1.length, calendar, showMenu);

	// 	const spotbody = document.getElementsByClassName('spot-details-wrapper');
	// 	console.log(spotbody);

	// 	const closeMenu = () => {
	// 		if (calendar1.length) {
	// 			calendar1[0].classList.remove('react-daterange-picker--open');
	// 			calendar1[0].classList.add('react-daterange-picker--closed');
	// 			calendar[0].classList.remove('react-daterange-picker__calendar--open');
	// 			calendar[0].classList.add('react-daterange-picker__calendar--closed');
	// 		}
	// 		setHaveDateSelected(false);
	// 	};

	// 	document.addEventListener('click', closeMenu);

	// 	return () => document.removeEventListener('click', closeMenu);
	// }, [showMenu]);

	// // function to open calendar when clicked on button
	// const handleOpenCalender = (e) => {
	// 	if (showMenu) return;

	// 	const calendar = document.getElementsByClassName(
	// 		'react-daterange-picker__calendar'
	// 	);
	// 	const calendar1 = document.getElementsByClassName('react-daterange-picker');
	// 	console.log(calendar, 'asdfasdfsadfsd', calendar1);
	// 	calendar1[0].classList.remove('react-daterange-picker--closed');
	// 	calendar1[0].classList.add('react-daterange-picker--open');
	// 	calendar[0].classList.remove('react-daterange-picker__calendar--closed');
	// 	calendar[0].classList.add('react-daterange-picker__calendar--open');
	// 	setHaveDateSelected(true);
	// };

	const formatDate = (date, key) => {
		const day = new Date(date).toDateString().toString();
		return day.split(' ')[0].split('').slice(0, 2).join('');
	};

	return (
		<div className="spot-details-body">
			<div className="spot-details-body-leftCol">
				{/* Spot Name and Host  */}
				<div className="spot-details-hostInfo">
					<div className="spot-details-hostInfo-row1">
						{name} hosted by {spot?.Owner.firstName}
					</div>
					<div className="spot-details-hostInfo-row2">spot #: {spot.id}</div>
				</div>

				{/* QUICK INFONATION */}
				<div className="quickInfo-wrapper">
					{/* SELF CHECK IN */}
					<div className="quickInfo">
						<img
							src="https://www.pngrepo.com/png/318342/180/lock.png"
							alt="self check-in logo"
							style={{ height: '30px', width: '30px' }}
						/>
						<div className="quickInfo-col1">
							<div className="quickInfo-row1">Self check-in</div>
							<div className="quickInfo-row2">
								Check yourself in with the keypad.
							</div>
						</div>
					</div>

					{/* COMMUNICATION*/}
					<div className="quickInfo">
						<i class="fa-brands fa-rocketchat" style={{ fontSize: '28px' }}></i>
						<div className="quickInfo-col1">
							<div className="quickInfo-row1">Great communication</div>
							<div className="quickInfo-row2">
								90% of recent guests rated {spot.Owner.firstName} 5-star in
								communication.
							</div>
						</div>
					</div>

					{/* SUPER HOST */}
					<div className="quickInfo">
						<img
							src="https://www.pngrepo.com/png/128236/180/badge.png"
							alt="Super Host logo"
							style={{ height: '30px', width: '30px' }}
						/>
						<div className="quickInfo-col1">
							<div className="quickInfo-row1">
								{spot.Owner.firstName} is a Superhost
							</div>
							<div className="quickInfo-row2">
								Superhosts are experienced, highly rated hosts who are committed
								to providing great stays for guests.
							</div>
						</div>
					</div>

					{/* FREE CANCELATION */}
					<div className="quickInfo">
						<img
							src="https://www.pngrepo.com/png/56251/180/calendar.png"
							alt="Super Host logo"
							style={{ height: '30px', width: '30px' }}
						/>
						<div className="quickInfo-col1">
							<div className="quickInfo-row1" style={{ fontSize: '24px' }}>
								Free Cancellation for 24 hours.
							</div>
						</div>
					</div>
				</div>

				<div className="aircover">
					<img
						src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
						style={{ height: '30px', width: '142px' }}
					/>
					<div>
						Every booking includes free protection from Host cancellations,
						listing inaccuracies, and other issues like trouble checking in.
					</div>
				</div>
				<div className="description-wrapper">
					<div>{spot.description}</div>
				</div>
			</div>
			<div className="spot-details-body-rightCol">
				<div className="booking-wrapper">
					<div className="price-and-review">
						<div>
							${spot.price} <span style={{ fontSize: '1rem' }}> night</span>
						</div>
						<div className="booking-reviews">
							{spot.avgStarRating ? (
								<i class="fa-solid fa-star"></i>
							) : (
								<i class="fa-regular fa-star"></i>
							)}{' '}
							{spot.avgStarRating ? spot.avgStarRating : 0} •{' '}
							<a href="#all-reviews" style={{ color: 'gray' }}>
								{spot.numReviews} reviews
							</a>
						</div>
					</div>
					<DateRangePicker
						onChange={setStartDate}
						value={bookingDates}
						minDate={new Date()}
						onClickDay={(value, event) => {
							if (selectedStartDate) setSelectedStartdate('');
							else setSelectedStartdate(value.toJSON().slice(0, 10).toString());
						}}
						rangeDivider={false}
						showDoubleView={true}
						monthPlaceholder={'mm'}
						yearPlaceholder={'yyyy'}
						dayPlaceholder={'dd'}
						showNeighboringMonth={false}
						calendarIcon={
							<button id="show-calendar-button">Check availability</button>
						}
						clearIcon={
							calendarOpened ? (
								<button id="clear-date-button">Clear dates</button>
							) : null
						}
						goToRangeStartOnSelect={false}
						showFixedNumberOfWeeks={false}
						tileDisabled={({ activeStartDate, date, view }) => {
							let currDate = date.toJSON().slice(0, 10).toString();
							for (let i = 0; i < spotBookings.length; i++) {
								let bookingDate = spotBookings[i];
								if (bookingDate[0] <= currDate && bookingDate[1] >= currDate)
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
						onClick={() => setCalendarOpened(true)}
						autoFocus={false}
					/>
					<div
						id="show-calendar-div"
						onClick={() => setCalendarOpened(true)}
					></div>
					{/* <button onClick={handleOpenCalender}>Check availability</button> */}
					{bookingDetails && (
						<>
							<div className="fees-wrapper">
								<div>
									${spot.price} x {totalStay} nights
								</div>
								<div>${priceBeforeFee}</div>
							</div>
							<div className="fees-wrapper">
								<div>Cleaning fee</div>
								<div>$300</div>
							</div>
							<div className="fees-wrapper serviceFee">
								<div>Service fee</div>
								<div>${serviceFee}</div>
							</div>
							<div>
								<div className="total-title">Total before taxes: </div>
								<div className="total">${totalPrice}</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
