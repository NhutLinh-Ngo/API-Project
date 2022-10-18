import React, { useEffect, useState } from 'react';
import './SingleSpotDetails.css';

export default function SpotImages({ spot, previewImage, otherImages }) {
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
						key={i}
						src={
							image
								? image.url
								: 'https://www.nicepng.com/png/detail/4-42119_coming-soon-coming-soon-logo-png.png'
						}
						alt={`Images`}
					/>
				))}
			</div>
		</div>
	);
}
