import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const PriceOverlay = ({ spot }) => {
	const [showPreview, setShowPreview] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (!showPreview) return;

		const closeMenu = () => {
			setShowPreview(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showPreview]);

	const directToSpotPage = (e) => {
		history.push(`/spots/${spot.id}`);
	};
	return (
		<div className="google-map-marker-wrapper">
			<div className="map-marker-wrapper" onClick={() => setShowPreview(true)}>
				${spot.price}
			</div>
			{showPreview && (
				<div className="preview-wrapper" onClick={directToSpotPage}>
					<div id="preview-image-wrapper">
						<img
							src={spot.previewImage}
							alt={spot.name}
							id="spot-preview-image-map"
						/>
					</div>
					<div id="map-preview-wrapper">
						<div id="map-location-review">
							<div>
								{spot.city}, {spot.state}
							</div>
							<div>
								<i class="fa-solid fa-star"></i>
								&nbsp;{spot.avgRating}
							</div>
						</div>
						<div id="map-preview-price-wrapper">
							<div id="map-preview-price">${spot.price}&nbsp;</div>night
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PriceOverlay;
