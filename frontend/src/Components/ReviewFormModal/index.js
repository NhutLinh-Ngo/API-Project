import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import useModalVariableContext from '../../context/ModalShowVariable';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/review';
import './SpotReviewFormModal.css';
export default function SpotReviewForm() {
	const { spotId } = useParams();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(null);
	const [hover, setHover] = useState(null);
	const [errors, setErrors] = useState({});
	const [hasSubmit, setHasSubmit] = useState(false);
	const { setShowModalReview } = useModalVariableContext();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleReviewReloadData = async () => {
		setShowModalReview(false);
		await dispatch(reviewsActions.getReviewsBySpotId(spotId));
		await dispatch(spotsActions.getDetailsOfSpot(spotId));
	};

	const HandleSubmitReview = async (e) => {
		e.preventDefault();
		setHasSubmit(true);

		setErrors({});

		const reviewInfoData = { review, stars };

		const newReview = await dispatch(
			reviewsActions.postReview(reviewInfoData, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});

		if (newReview) {
			handleReviewReloadData();
		}
	};
	return (
		<div className="login-form-wrapper">
			<p className="close-login" onClick={() => setShowModalReview(false)}>
				x
			</p>
			<h4 className="login-title">How was your stay?</h4>
			<form className="login-form review-form" onSubmit={HandleSubmitReview}>
				<div className="rating-text">Rating</div>
				<div className="stars-rating">
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;
						return (
							<label key={i}>
								<input
									className="star-input"
									type="radio"
									name="rating"
									value={ratingValue}
									onClick={() => setStars(ratingValue)}
								/>
								<FaStar
									className="stars"
									class="fa-solid fa-star"
									color={
										ratingValue <= (hover || stars) ? '#ffc107' : '#e4e5e9'
									}
									size={25}
									onMouseEnter={() => setHover(ratingValue)}
									onMouseLeave={() => setHover(null)}
								/>
							</label>
						);
					})}
				</div>
				<div className=" error">
					{hasSubmit && <span>{errors.stars ? errors.stars : null}</span>}
				</div>
				<div className="review-text-wrapper">
					<div className="review-text-title">Write about your stay</div>
					<div className="review-text-subTitle">
						Tell future travelers about what they can expect at this place.
					</div>
					<textarea
						className="review-text"
						name="review-text"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Tell everyone about your experience"
					/>
				</div>
				<div className=" error">
					{hasSubmit && <span>{errors.review ? errors.review : null}</span>}
				</div>
				<button className="review-button">post!</button>
			</form>
		</div>
	);
}
