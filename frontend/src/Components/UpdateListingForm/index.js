import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsOfSpot } from '../../store/spots';
import * as spotsActions from '../../store/spots';
import './UpdateListingForm.css';
export default function UpdateListingForm() {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.SingleSpots);

	// create spot controlled form state
	const [address, setAddress] = useState(spot.address);
	const [city, setCity] = useState(spot.city);
	const [state, setState] = useState(spot.state);
	const [country, setCountry] = useState(spot.country);
	const [name, setName] = useState(spot.name);
	const [description, setDescription] = useState(spot.description);
	const [price, setPrice] = useState(spot.price);
	const [errors, setErrors] = useState({});
	const [hasSubmit, setHasSubmit] = useState(false);

	useEffect(() => {
		dispatch(getDetailsOfSpot(spotId));
	}, [dispatch]);

	if (!spot) return null;

	console.log(address, city, state, country, name, description, price);
	return (
		<div className="create-page-form-wrapper">
			<div className="create-spot-home-navlink">
				<NavLink to="/">
					<img
						src="https://mybnb-lucyluo.herokuapp.com/assets/logo-34e8587533b17eeb904517e28f490075173a3380205cde3cd6581bcae66d9c46.png"
						alt="home log"
						style={{ heigh: '50x', width: '50px' }}
					/>
				</NavLink>
			</div>
			<div id="create-spot-title">
				Need to make some changes? to <br /> {spot.name}
			</div>
			<div className="spot-form-wrapper">
				<button
					style={{
						position: 'absolute',
						top: '2rem',
						right: '2rem',
						border: 'none',
						backgroundColor: 'white',
						cursor: 'pointer'
					}}
				>
					Remove spot from listing
				</button>
				<form id="create-form">
					<input
						className="spot-form-input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name of your place"
					/>
					{hasSubmit && (
						<div className="spot-error1 error">
							{errors.name ? errors.name : <div></div>}
						</div>
					)}
					<input
						className="spot-form-input"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
					/>
					{hasSubmit && (
						<div className="spot-error2 error">
							{errors.address ? errors.address : null}
						</div>
					)}
					<input
						className="spot-form-input"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="City"
					/>
					{hasSubmit && (
						<div className="spot-error3 error">
							{errors.city ? errors.city : null}
						</div>
					)}
					<input
						className="spot-form-input"
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						placeholder="State"
					/>
					{hasSubmit && (
						<div className="spot-error4 error">
							{errors.state ? errors.state : null}
						</div>
					)}
					<input
						className="spot-form-input"
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						placeholder="Country"
					/>
					{hasSubmit && (
						<div className="spot-error5 error">
							{errors.country ? errors.country : null}
						</div>
					)}
					<textarea
						className="form-textArea"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Tell everyone about your amazing place..."
					/>
					{hasSubmit && (
						<div className="spot-error6 error">
							{errors.description ? errors.description : null}
						</div>
					)}
					<input
						className="spot-form-input"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price per night"
					/>
					{hasSubmit && (
						<div className="spot-error7 error">
							{errors.price ? errors.price : null}
						</div>
					)}
					<button className="form-submit-button">Update</button>
				</form>
			</div>
		</div>
	);
}
