import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import './AllSpots.css';
import SingleSpotCard from '../SpotSingleCard';
import * as spotsActions from '../../store/spots';
import GoogleMapAllSpots from '../GoogleMapsAllSpots';

export default function SearchResultPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const allSpots = useSelector((state) => Object.values(state.spots.AllSpots));

	const [showMap, setShowMap] = useState(false);
	useEffect(() => {
		dispatch(spotsActions.getAllSpots());
	}, [dispatch]);

	if (!allSpots.length) return null;

	return (
		<div className="allSpots-wrapper">
			{allSpots?.map((spot) => (
				<SingleSpotCard spot={spot} key={spot.id} />
			))}
		</div>
	);
}
