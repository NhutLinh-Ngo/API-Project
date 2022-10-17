import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsOfSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import Title from './Title';
import SpotImages from './SpotImages';
import SpotDetailsBody from './SpotDetailsBody';
import SpotReviews from '../SpotReviews';
import './SingleSpotDetails.css';

export default function SingleSpotDetails() {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spots.SingleSpots);

	// Fetch and Load data
	useEffect(() => {
		dispatch(getDetailsOfSpot(spotId));
	}, [dispatch]);

	// wait for Spot to load
	if (!spot) return null;

	//get Preview Image
	const previewImage = spot.SpotImages?.find((image) => image.preview === true);
	// get all Non-preview Images
	const otherImages = spot.SpotImages?.filter(
		(image) => image.preview === false
	);

	// get 3 Word Name of location
	const spotNameArr = spot.name?.split(' ');
	let name = '';
	for (let i = 0; i < spotNameArr?.length; i++) {
		name += spotNameArr[i] + ' ';
		if (i === 2) break;
	}

	return (
		<div className="spot-details-wrapper">
			<Title spot={spot} />
			<SpotImages
				spot={spot}
				otherImages={otherImages}
				previewImage={previewImage}
			/>
			<SpotDetailsBody name={name} spot={spot} />
			<SpotReviews spot={spot} />
		</div>
	);
}
