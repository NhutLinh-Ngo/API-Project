import React from 'react';
import './SingleSpotDetails.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useState } from 'react';
import './SingleSpotDetails.css';
import { useEffect } from 'react';

export default function SpotDetailsBody({ spot, name }) {
	const [starDate, setStartDate] = useState('');
	const serviceFee = parseInt((spot.price * 7 * 0.145).toFixed(0));
	const pricePerWeek = parseInt(spot.price * 7);
	const totalPrice = serviceFee + pricePerWeek + 300;

	useEffect(() => {
		const box = document.getElementsByClassName(
			'react-daterange-picker__inputGroup'
		);
		const checkIn = document.createElement('div');
		const checkOut = document.createElement('div');
		checkIn.classList.add('date-checkin-label');
		checkOut.classList.add('date-checkin-label');

		const monthButtom = document.getElementsByClassName(
			'react-calendar__navigation__label'
		);

		const contentCheckIn = document.createTextNode('CHECK-IN');
		const contentCheckOut = document.createTextNode('CHECK-OUT');
		checkIn.appendChild(contentCheckIn);
		checkOut.appendChild(contentCheckOut);
		box[0].prepend(checkIn);
		box[1].prepend(checkOut);
	}, []);

	useEffect(() => {
		const endDate = document.getElementsByClassName(
			'react-calendar__tile--rangeEnd'
		);

		if (endDate.length) {
			const lastIndex = endDate.length - 1;
			endDate[lastIndex].classList.add('checkout-date-tile');
		}

		console.log(starDate);
	}, [starDate]);

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
					<DateRangePicker
						onChange={setStartDate}
						value={starDate}
						minDate={new Date()}
						rangeDivider={false}
						showDoubleView={true}
						monthPlaceholder={'mm'}
						yearPlaceholder={'yyyy'}
						dayPlaceholder={'dd'}
						calendarIcon={null}
						showFixedNumberOfWeeks={true}
						// tileDisabled={({ activeStartDate, date, view }) =>
						// 	console.log(date)
						// }
						view={'month'}
						formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
						className="spot-datepicker"
					/>
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
					<div className="fees-wrapper">
						<div>${spot.price} x 7 nights</div>
						<div>${pricePerWeek}</div>
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
				</div>
			</div>
		</div>
	);
}
