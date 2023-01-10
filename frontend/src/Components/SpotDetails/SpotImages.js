import React, { useEffect, useState } from 'react';
import './SingleSpotDetails.css';

export default function SpotImages({ spot }) {
	//get Preview Image
	const previewImage = spot.SpotImages?.find((image) => image.preview === true);
	// get all Non-preview Images
	let otherImages = new Array(4).fill(null);
	const nonPreviewImages = spot.SpotImages?.filter(
		(image) => image.preview === false
	);
	nonPreviewImages?.forEach((image, i) => {
		otherImages[i] = image;
	});
	return (
		<div className="spot-details-images-wrapper">
			<div className="spot-details-preview-image">
				<img
					src={
						previewImage
							? previewImage.url
							: 'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png'
					}
					alt="preview Image"
					className="spot-details-preview"
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src =
							'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png';
					}}
				/>
			</div>
			<div className="spot-details-other-images">
				{otherImages?.map((image, i) => (
					<img
						className={`spot-details-other-image`}
						key={i}
						src={
							image
								? image.url
								: 'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png'
						}
						alt={`Images`}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src =
								'https://nhutbnb.s3.us-west-1.amazonaws.com/default_photo.png';
						}}
					/>
				))}
			</div>
		</div>
	);
}
