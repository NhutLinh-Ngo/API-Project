import React, { useEffect, useState } from 'react';
import './SingleSpotDetails.css';
export default function SingleSpotTitle({ spot }) {
	return (
		<div className="spot-details-title-wrapper">
			<h1 className="spot-details-title-row1">{spot.name}</h1>
			<div className="spot-details-title-row2">
				<span className="spot-details-tile-rating">
					<i class="fa-solid fa-star"></i>{' '}
					{spot.avgStarRating
						? spot.avgStarRating
						: 'Be the first to rate this place!'}
				</span>{' '}
				•
				<span className="spot-details-tile-reviews">
					{' '}
					{spot.numReviews} reviews{' '}
				</span>{' '}
				•{' '}
				<span className="spot-details-tile-location">
					{spot.city}, {spot.state}, {spot.country}
				</span>
			</div>
		</div>
	);
}
