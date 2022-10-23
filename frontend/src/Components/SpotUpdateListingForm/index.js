import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsOfSpot } from '../../store/spots';
import * as spotsActions from '../../store/spots';
import './UpdateListingForm.css';
export default function UpdateListingForm() {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const spot = useSelector((state) => state.spots.SingleSpots);

	// create spot controlled form state
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState({});
	const [hasSubmit, setHasSubmit] = useState(false);

	useEffect(() => {
		dispatch(getDetailsOfSpot(spotId));
	}, [dispatch]);

	useEffect(() => {
		setAddress(spot.address);
		setCity(spot.city);
		setState(spot.state);
		setCountry(spot.country);
		setName(spot.name);
		setDescription(spot.description);
		setPrice(spot.price);
	}, [spot]);

	const hanldeUpdateSpot = async (e) => {
		e.preventDefault();
		setHasSubmit(true);

		setErrors({});
		const SpotUpdateInfo = {
			address,
			city,
			state,
			country,
			name,
			description,
			price
		};
		const updatedSpot = await dispatch(
			spotsActions.UpdateSpot(SpotUpdateInfo, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});

		//REDIRECT TO NEW SPOT IF EVERYTHING GO WELL!
		if (updatedSpot) history.push(`/spots/${spotId}`);
	};

	const HandleDeleteSpot = async () => {
		if (window.confirm('Please confirm you want to delete this listing!'))
			await dispatch(spotsActions.DeleteSpot(spotId));

		history.push('/');
	};
	if (!Object.values(spot).length) return null;
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
			<div className="update-spot-form">
				Need to make some changes? to <br /> {spot.name}
			</div>
			<div className="spot-form-wrapper">
				<button className="delete-spot-button" onClick={HandleDeleteSpot}>
					Remove spot from listing
				</button>
				<form id="create-form" onSubmit={hanldeUpdateSpot}>
					<input
						className="spot-form-input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name of your place"
					/>
					<div className="spot-error1 error">
						{hasSubmit && (
							<span>{errors.name ? errors.name : <div></div>}</span>
						)}
					</div>
					<input
						className="spot-form-input"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
					/>
					<div className="spot-error2 error">
						{hasSubmit && <span>{errors.address ? errors.address : null}</span>}
					</div>
					<input
						className="spot-form-input"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="City"
					/>
					<div className="spot-error3 error">
						{hasSubmit && <span>{errors.city ? errors.city : null}</span>}
					</div>
					<input
						className="spot-form-input"
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						placeholder="State"
					/>
					<div className="spot-error4 error">
						{hasSubmit && <span>{errors.state ? errors.state : null}</span>}
					</div>
					<input
						className="spot-form-input"
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						placeholder="Country"
					/>
					<div className="spot-error5 error">
						{hasSubmit && <span>{errors.country ? errors.country : null}</span>}
					</div>
					<textarea
						className="form-textArea"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Tell everyone about your amazing place..."
					/>
					<div className="spot-error6 error">
						{hasSubmit && (
							<span>{errors.description ? errors.description : null}</span>
						)}
					</div>
					<input
						className="spot-form-input"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price per night"
					/>
					<div className="spot-error7 error">
						{hasSubmit && <span>{errors.price ? errors.price : null}</span>}
					</div>
					<button className="form-submit-button">Update</button>
				</form>
			</div>
		</div>
	);
}
