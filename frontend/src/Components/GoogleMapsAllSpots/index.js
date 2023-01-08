import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
import PriceOverlay from './PriceOverlay.js';
import './Maps.css';
async function getLocation(address) {
	return Geocode.fromAddress(address).then(
		(response) => {
			const { lat, lng } = response.results[0].geometry.location;
			return { lat, lng };
		},
		(error) => {
			console.error(error);
		}
	);
}

const GoogleMapAllSpots = ({ spots, zoom }) => {
	const [currentPosition, setCurrentPosition] = useState([]);
	const [mapLoaded, setMapLoaded] = useState(false);
	const dispatch = useDispatch();
	Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();

	console.log(spots);
	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = async () => {
			let allLocation = [];
			for (let i = 0; i < spots.length; i++) {
				let business = spots[i];
				const location = await getLocation(
					`${business.address}, ${business.city}`
				);
				business.location = location;
				allLocation.push(business);
			}
			setCurrentPosition(allLocation);
		};
		if (!currentPosition.length) makeMap();
	}, [spots]);

	console.log(currentPosition);
	//This sets the center of the map. This must be set BEFORE the map loads

	// This is the equivalent to a script tag
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
	});

	const containerStyle = {
		width: '100%',
		height: '100vh'
	};

	const [map, setMap] = useState(null);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		// Important! Always set the container height explicitly

		<>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					zoom={zoom ? zoom : 7}
					center={currentPosition[0]?.location}
					onUnmount={onUnmount}
				>
					{/* {currentPosition.map((position) => (
						<Marker
							position={position.location}
							title="red-marker"
							streetView={false}
						/>
					))} */}
					{currentPosition.map((spot, i) => (
						<OverlayView
							position={spot.location}
							mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
						>
							<PriceOverlay
								spot={spot}
								key={i}
								idx={i}
								// selectedBusiness={selectedBusiness}
							/>
						</OverlayView>
					))}
				</GoogleMap>
			)}
		</>
	);
};

export default GoogleMapAllSpots;
