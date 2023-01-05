import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './AllSpots.css';
import SingleSpotCard from '../SpotSingleCard';
import * as spotsActions from '../../store/spots';
import GoogleMapAllSpots from '../GoogleMapsAllSpots';

export default function AllSpots() {
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => Object.values(state.spots.AllSpots));

	const [showMap, setShowMap] = useState(false);
	useEffect(() => {
		dispatch(spotsActions.getAllSpots());
	}, [dispatch]);

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
			<button
				className="show-map-list-button"
				onClick={() => setShowMap(!showMap)}
			>
				{display(showMap)}
			</button>
			{!showMap && (
				<div className="allSpots-wrapper">
					{allSpots?.map((spot) => (
						<SingleSpotCard spot={spot} key={spot.id} />
					))}
				</div>
			)}
			{showMap && (
				<div className="allSpot-map-wrapper">
					<GoogleMapAllSpots spots={allSpots} />
				</div>
			)}
		</>
	);
}
