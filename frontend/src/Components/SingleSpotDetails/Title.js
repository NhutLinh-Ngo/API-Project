import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './SingleSpotDetails.css';
export default function SingleSpotTitle({ spot }) {
	const sessionUser = useSelector((state) => state.session.user);
	const { spotId } = useParams();
	let allowEdit = false;
	if (sessionUser) allowEdit = sessionUser.id == spot.ownerId;

	return (
		<div className="spot-details-title-wrapper">
			<div className="spot-details-main-title">
				<h1 className="spot-details-title-row1">{spot.name}</h1>
				{allowEdit && (
					<NavLink to={`/spots/${spotId}/update`} className="edit-listing">
						Edit this listing
					</NavLink>
				)}
			</div>
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
					<a href="#all-reviews" style={{ color: 'black' }}>
						{spot.numReviews} reviews
					</a>
				</span>{' '}
				•{' '}
				<span className="spot-details-tile-location">
					{spot.city}, {spot.state}, {spot.country}
				</span>
			</div>
		</div>
	);
}
