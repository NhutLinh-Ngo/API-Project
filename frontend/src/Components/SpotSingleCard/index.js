import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SingleSpotCard.css';
export default function SingleSpotCard({ spot }) {
	const [isLoaded, setIsLoaded] = useState(false);
	setTimeout(() => setIsLoaded(true), 450);

	const spotNameArr = spot.name.split(' ');
	let name = '';
	for (let i = 0; i < spotNameArr.length; i++) {
		name += spotNameArr[i] + ' ';
		if (i === 2) break;
	}
	return (
		<NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
			<div className="single-spot-card-wrapper">
				{isLoaded && (
					<>
						<img
							className="single-card-previewImage"
							src={
								spot.previewImage == 'No preview Image Yet'
									? 'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png'
									: spot.previewImage
							}
							alt={spot.name}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src =
									'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png';
							}}
						/>
						<div className="single-card-row1 card-row">
							<span>
								{spot.city}, {spot.state}
							</span>
							<span>
								{spot.avgRating ? spot.avgRating : ''}{' '}
								{spot.avgRating == 0 ? (
									<i class="fa-regular fa-star"></i>
								) : (
									<i class="fa-solid fa-star"></i>
								)}
							</span>
						</div>
						<div className="single-card-row2 card-row">{name}</div>
						{/* <div className="single-card-row3">{numBeds} beds</div> */}
						<div className="single-card-row4 card-row">
							<span>${spot.price}</span> night
						</div>
					</>
				)}
				{!isLoaded && (
					<>
						<Skeleton
							className="single-card-previewImage"
							borderRadius="12px"
							style={{
								zIndex: '-1',
								maxWidth: '100%',
								minHeight: '200px'
							}}
						/>
						<div className="single-card-row1 card-row">
							<Skeleton
								borderRadius="12px"
								style={{ zIndex: '-1', width: '130px' }}
							/>
							<Skeleton
								borderRadius="12px"
								style={{ zIndex: '-1', width: '50px' }}
							/>
						</div>
						<Skeleton
							className="single-card-row2 card-row"
							borderRadius="12px"
							style={{ zIndex: '-1', width: '230px' }}
						/>
						<Skeleton
							className="single-card-row4 card-row"
							borderRadius="12px"
							style={{ zIndex: '-1', width: '100px' }}
						/>
					</>
				)}
			</div>
		</NavLink>
	);
}
