import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import './AllSpots.css';
import SingleSpotCard from '../SpotSingleCard';
import * as spotsActions from '../../store/spots';
import GoogleMapAllSpots from '../GoogleMapsAllSpots';

export default function AllSpots() {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const destination = params.get('desc');
	const checkInDate = params.get('checkIn');
	const checkOutDate = params.get('checkOut');

	const allSpots = useSelector((state) => Object.values(state.spots.AllSpots));

	const [showMap, setShowMap] = useState(false);
	const [filterSpots, setFilterSpots] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			let spots = await dispatch(spotsActions.getAllSpots());
			let FilteredSpots = [];
			// Filter out by available dates;
			if (checkInDate) {
				spots = spots.filter((spot) => {
					let spotBookings = spot.Bookings;
					if (!spotBookings.length) return true;
					for (let i = 0; i < spotBookings.length; i++) {
						let booking = spotBookings[i];
						// conflicting start date
						if (
							(checkInDate >= booking.startDate &&
								checkInDate <= booking.endDate) ||
							checkInDate === booking.startDate ||
							checkInDate === booking.endDate
						)
							return false;
						// conflicting End date
						else if (
							(checkOutDate >= booking.startDate &&
								checkOutDate <= booking.endDate) ||
							checkOutDate === booking.startDate ||
							checkOutDate === booking.endDate
						)
							return false;
						else if (
							checkInDate <= booking.startDate &&
							booking.endDate <= checkOutDate
						)
							return false;
					}
					return true;
				});
				FilteredSpots = spots;
			}
			if (destination) {
				spots = spots.filter(
					(spot) =>
						destination.toLowerCase().includes(spot.city.toLowerCase()) ||
						destination.toLowerCase().includes(spot.state.toLowerCase())
				);
				FilteredSpots = spots;
			}
			setFilterSpots(FilteredSpots);
		};

		fetchData();
	}, [dispatch, destination, checkInDate, checkOutDate]);

	useEffect(() => {}, []);
	if (!allSpots.length) return null;

	const display = (showMap) => {
		if (showMap)
			return (
				<div>
					Show list&nbsp;&nbsp;<i class="fa-solid fa-list-ul"></i>
				</div>
			);
		else
			return (
				<div>
					Show map&nbsp;&nbsp;<i class="fa-solid fa-map"></i>
				</div>
			);
	};

	return (
		<>
			{filterSpots.length == 0 && (
				<button
					className="show-map-list-button"
					onClick={() => setShowMap(!showMap)}
				>
					{display(showMap)}
				</button>
			)}
			{!showMap && (
				<div className="allSpots-main-wrapper">
					{filterSpots.length == 0 && (
						<div className="allSpots-wrapper">
							{filterSpots.length == 0 &&
								allSpots?.map((spot) => (
									<SingleSpotCard spot={spot} key={spot.id} />
								))}
						</div>
					)}

					{filterSpots.length > 0 && (
						<div className="allSpots-result-wrapper">
							{filterSpots.map((spot) => (
								<SingleSpotCard spot={spot} key={spot.id} />
							))}
						</div>
					)}
					{filterSpots.length > 0 && (
						<div className="allSpot-map-search-wrapper">
							<GoogleMapAllSpots spots={filterSpots} zoom={13} />
						</div>
					)}
				</div>
			)}
			{filterSpots.length == 0 && showMap && (
				<div className="allSpot-map-wrapper">
					<GoogleMapAllSpots spots={allSpots} />
				</div>
			)}
		</>
	);
}
