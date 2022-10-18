import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './AllSpots.css';
import SingleSpotCard from '../SpotSingleCard';
import * as spotsActions from '../../store/spots';

export default function AllSpots() {
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => Object.values(state.spots.AllSpots));

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
