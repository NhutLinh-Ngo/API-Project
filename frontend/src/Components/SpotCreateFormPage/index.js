import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateSpotFormPage.css';
import * as spotsActions from '../../store/spots';
export default function CreateSpotFormPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	// create spot controlled form state
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState({});
	const [spotId, setSpotId] = useState('');
	const [hasSubmit, setHasSubmit] = useState(false);

	// images controlled state
	const [previewImg, setPreviewImg] = useState(null);
	const [otherImages, setOtherImages] = useState(new Array(4).fill(null));
	const [hasSubmitImg, setHasSubmitImg] = useState(false);
	const [imageErrors, setImageErrors] = useState({});

	// TOGGLE BETWEEN create spot and add images form
	const [showSpotForm, setShowSpotForm] = useState(true);
	const [showImageForm, setShowImageForm] = useState(false);

	// onsubmit handle for Creating new Spot
	let newSpot;
	const handleFormInfo = async (e) => {
		e.preventDefault();
		setHasSubmit(true);
		setErrors({});
		const spotInfo = {
			address,
			city,
			state,
			country,
			name,
			description,
			price
		};
		// POST fetch to create new SPOT!
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
		setHasSubmitImg(true);
		setImageErrors({});

		// POST PREVIEW IAMGE
		const previewImageData = { url: previewImg, preview: true };
		let sucessPost = await dispatch(
			spotsActions.AddImageToSpot(previewImageData, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setImageErrors(data.errors);
			}
		});

		// POST OTHER IMAGES IF PROVIDED,
		//otherImage is fill with null thus it will only post aditional image if provided.
		await otherImages.forEach(async (image) => {
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

		//REDIRECT TO NEW SPOT IF EVERYTHING GO WELL!
		if (!Object.values(imageErrors).length) history.push(`/spots/${spotId}`);
	};

	// FILL IN NULL FILLED array with aditional images if user provide them
	const updateOtherImagesFieldChange = (index) => (e) => {
		let newArr = [...otherImages];
		newArr[index] = e.target.value;

		setOtherImages(newArr);
	};
	return (
		<div className="create-page-form-wrapper">
			{/* NAVLINK img to redirect user back home */}
			<div className="create-spot-home-navlink">
				<NavLink to="/">
					<img
						src="https://mybnb-lucyluo.herokuapp.com/assets/logo-34e8587533b17eeb904517e28f490075173a3380205cde3cd6581bcae66d9c46.png"
						alt="home log"
						style={{ heigh: '50x', width: '50px' }}
					/>
				</NavLink>
			</div>
			{showSpotForm && (
				<div id="create-spot-title">
					Open your door to hosting, <br />
					provide information about your place
				</div>
			)}
			{showImageForm && (
				<div id="create-spot-title">Let add some images to your place!</div>
			)}
			<div className="spot-form-wrapper">
				{showSpotForm && (
					<>
						<form id="create-form" onSubmit={handleFormInfo}>
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
								{hasSubmit && (
									<span>{errors.address ? errors.address : null}</span>
								)}
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
								{hasSubmit && (
									<span>{errors.country ? errors.country : null}</span>
								)}
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
							<button className="form-submit-button">
								Lets add some pictures!
							</button>
						</form>
					</>
				)}

				{/* IMAGES FORM */}
				{showImageForm && (
					<>
						<form id="create-form" onSubmit={handleImageForm}>
							<input
								className="spot-form-input"
								type="url"
								value={previewImg}
								onChange={(e) => setPreviewImg(e.target.value)}
								placeholder="Preview Image"
								required
							/>
							<div className="spot-error7 error">
								{hasSubmitImg && (
									<span>{imageErrors.url ? imageErrors.url : null}</span>
								)}
							</div>
							{otherImages.map((item, i) => {
								return (
									<input
										className="spot-form-input image-form-input"
										key={i}
										type="url"
										value={item}
										onChange={updateOtherImagesFieldChange(i)}
										placeholder="additional Image (optional)"
									/>
								);
							})}
							<button className="form-submit-button">host</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
