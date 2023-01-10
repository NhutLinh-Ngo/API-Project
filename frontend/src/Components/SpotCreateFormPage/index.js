import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetailsOfSpot } from '../../store/spots';
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
	const [otherImages, setOtherImages] = useState(new Array(4).fill(null));
	const [hasSubmitImg, setHasSubmitImg] = useState(false);
	const [imageErrors, setImageErrors] = useState({});
	const [UploadedImages, setUploadedImages] = useState([]);

	// TOGGLE BETWEEN create spot and add images form
	const [showSpotForm, setShowSpotForm] = useState(true);
	const [showImageForm, setShowImageForm] = useState(false);

	//AWS IMAGES
	const [images, setImages] = useState([]);

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
		if (!images.length) {
			if (
				window.confirm(
					'Are you sure you dont want to add any picture to your listing ?'
				)
			) {
				return history.push(`/spots/${spotId}`);
			}
		} else {
			history.push(`/spots/${spotId}`);
			await dispatch(getDetailsOfSpot(spotId));
		}
	};

	const handleAddPhotos = (e) => {
		const postImage = async (imagess) => {
			console.log(imagess);
			let imageArr = [];
			let allImages = Object.values(imagess);
			for (let i = 0; i < allImages.length; i++) {
				let image = allImages[i];
				let preview = i == 0 ? true : false;
				const imageData = { url: image, preview };
				const newImage = await dispatch(
					spotsActions.AddImageToSpot(imageData, spotId)
				).catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) {
						setImageErrors(data.errors);
					}
				});
				imageArr.push(newImage.url);
			}
			console.log(imageArr);
			setUploadedImages(imageArr);
		};
		const updateFiles = (e) => {
			const files = e.target.files;
			postImage(files);
		};

		updateFiles(e);
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
							<div className="uploaded-images-wrapper">
								{UploadedImages.map((image) => (
									<img src={image} className="spot-uploaded-images" />
								))}
							</div>
							<div className="choose-file-main-button-wrapper center">
								<label className="choose-file-main-button">
									Choose files
									<input
										type="file"
										multiple
										onChange={handleAddPhotos}
										className="choose-file-image-button"
									/>
								</label>
							</div>
							<button className="form-submit-button">host</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
