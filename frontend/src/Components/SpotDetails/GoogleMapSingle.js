import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';

const GoogleMapSingleSpot = ({ spot }) => {
	const [currentPosition, setCurrentPosition] = useState([]);
	Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();

	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = () => {
			Geocode.fromAddress(`${spot.address}, ${spot.city}`).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					setCurrentPosition({ lat, lng });
				},
				(error) => {
					console.error(error);
				}
			);
		};

		makeMap();
	}, []);

	console.log(currentPosition);
	//This sets the center of the map. This must be set BEFORE the map loads

	// This is the equivalent to a script tag
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
	});

	const containerStyle = {
		width: '100%',
		height: '500px',
		zIndex: '-1'
	};

	const [map, setMap] = useState(null);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		// Important! Always set the container height explicitly

		<div className="map-single-wrapper">
			<div className="map-single-title">Where you'll be</div>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					zoom={13}
					center={currentPosition}
					onUnmount={onUnmount}
				>
					<OverlayView
						position={currentPosition}
						mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					>
						<div className="single-house-map">
							<div className="marker-circle-content">
								<i class="fa-solid fa-house-chimney"></i>
							</div>
						</div>
					</OverlayView>
				</GoogleMap>
			)}
		</div>
	);
};

export default GoogleMapSingleSpot;
