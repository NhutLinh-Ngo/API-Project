import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import './SingleSpotCard.css';
export default function SingleSpotCard({ spot }) {
	const spotNameArr = spot.name.split(' ');
	let name = '';
	for (let i = 0; i < spotNameArr.length; i++) {
		name += spotNameArr[i] + ' ';
		if (i === 2) break;
	}
	return (
		<NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
			<div className="single-spot-card-wrapper">
				<img
					className="single-card-previewImage"
					src={spot.previewImage}
					alt={spot.name}
				/>
				<div className="single-card-row1 card-row">
					<span>
						{spot.city}, {spot.state}
					</span>
					<span>
						<i class="fa-solid fa-star"></i>
					</span>
				</div>
				<div className="single-card-row2 card-row">{name}</div>
				{/* <div className="single-card-row3">{numBeds} beds</div> */}
				<div className="single-card-row4 card-row">
					<span>${spot.price}</span> night
				</div>
			</div>
		</NavLink>
	);
}
