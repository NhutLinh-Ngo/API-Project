import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CreateSpotFormPage.css';
import * as spotsActions from '../../store/spots';
export default function CreateSpotFormPage() {
	const dispatch = useDispatch();
	// create spot controlled form data
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState({});
	const [imageErrors, setImageErrors] = useState({});
	const [spotId, setSpotId] = useState('');

	const history = useHistory();
	// submission controlled data
	const [hasSubmit, setHasSubmit] = useState(false);
	const [showSpotForm, setShowSpotForm] = useState(true);
	const [showImageForm, setShowImageForm] = useState(false);

	// images controlled data
	const [previewImg, setPreviewImg] = useState(null);
	const [otherImages, setOtherImages] = useState(new Array(5).fill(null));

	let newSpot;
	// onsubmit handle for Creating new Spot
	const handleFormInfo = async (e) => {
		e.preventDefault();
		setHasSubmit(true);
		setErrors({});
		const spotInfo = {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price
		};
		newSpot = await dispatch(spotsActions.CreateNewSpot(spotInfo)).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			}
		);

		//switch to image Form if post spot successful
		if (newSpot) {
			setSpotId(newSpot.id);
			setShowSpotForm(false);
			setShowImageForm(true);
		}
	};

	// on submit handle for new spot images
	const handleImageForm = async (e) => {
		e.preventDefault();
		setImageErrors({});
		let sucessPost;
		const previewImageData = { url: previewImg, preview: true };
		sucessPost = await dispatch(
			spotsActions.AddImageToSpot(previewImageData, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setImageErrors(data.errors);
			}
		});

		// posting other pictures
		otherImages.forEach(async (image) => {
			if (image) {
				const imageData = { url: image, preview: false };
				await dispatch(spotsActions.AddImageToSpot(imageData, spotId)).catch(
					async (res) => {
						const data = await res.json();
						if (data && data.errors) {
							setImageErrors(data.errors);
						}
					}
				);
			}
		});

		if (!Object.values(imageErrors).length) history.push(`/spots/${spotId}`);
	};

	const updateOtherImagesFieldChange = (index) => (e) => {
		let newArr = [...otherImages];
		newArr[index] = e.target.value;

		setOtherImages(newArr);
	};
	return (
		<div className="create-page-form-wrapper">
			<div className="create-spot-home-navlink">
				<NavLink to="/">
					<img
						src="https://mybnb-lucyluo.herokuapp.com/assets/logo-34e8587533b17eeb904517e28f490075173a3380205cde3cd6581bcae66d9c46.png"
						alt="home log"
						style={{ heigh: '40x', width: '40px' }}
					/>
				</NavLink>
				<span id="create-spot-title">Open your door to hosting</span>
			</div>
			<div className="spot-form-wrapper">
				{showSpotForm && (
					<>
						<div>Provide information about your place</div>
						<form id="create-form" onSubmit={handleFormInfo}>
							<input
								className="spot-form-input"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Name of your place"
							/>
							{hasSubmit && (
								<div className="spot-error1">
									{errors.name ? errors.name : null}
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
								<div className="spot-error2">
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
								<div className="spot-erro3r">
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
								<div className="spot-error4">
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
								<div className="spot-error5">
									{errors.country ? errors.country : null}
								</div>
							)}
							<input
								className="spot-form-input"
								type="number"
								value={lat}
								onChange={(e) => setLat(e.target.value)}
								placeholder="Latitude (optional)"
							/>
							{hasSubmit && (
								<div className="spot-error6">
									{errors.lat ? errors.lat : null}
								</div>
							)}
							<input
								className="spot-form-input"
								type="number"
								value={lng}
								onChange={(e) => setLng(e.target.value)}
								placeholder="Longitude (optional)"
							/>
							{hasSubmit && (
								<div className="spot-error7">
									{errors.lng ? errors.lng : null}
								</div>
							)}
							<textarea
								className="spot-form-input form-textArea"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Tell everyone about your amazing place..."
							/>
							{hasSubmit && (
								<div className="spot-error8">
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
								<div className="spot-error9">
									{errors.price ? errors.name : null}
								</div>
							)}
							<button>Lets add some images!</button>
						</form>
					</>
				)}

				{/* IMAGES FORM */}
				{showImageForm && (
					<>
						<div>Add images to show case your place!</div>
						<form id="create-form" onSubmit={handleImageForm}>
							<input
								type="url"
								value={previewImg}
								onChange={(e) => setPreviewImg(e.target.value)}
								placeholder="Preview Image"
								required
							/>
							{otherImages.map((item, i) => {
								return (
									<input
										key={i}
										type="url"
										value={item}
										onChange={updateOtherImagesFieldChange(i)}
										placeholder="additional Image (optional)"
									/>
								);
							})}
							<button>host</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
