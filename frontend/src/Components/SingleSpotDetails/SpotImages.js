import React, { useEffect, useState } from 'react';
import './SingleSpotDetails.css';

export default function SpotImages({ spot, previewImage, otherImages }) {
	console.log(otherImages);
	return (
		<div className="spot-details-images-wrapper">
			<div className="spot-details-preview-image">
				<img
					src={previewImage?.url}
					alt="preview Image"
					className="spot-details-preview"
				/>
			</div>
			<div className="spot-details-other-images">
				{otherImages?.map((image, i) => (
					<img
						className={`spot-details-other-image`}
						key={image.id}
						src={image.url}
						alt={`${spot.name} Images`}
					/>
				))}
			</div>
		</div>
	);
}
