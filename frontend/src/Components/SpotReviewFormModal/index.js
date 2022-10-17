import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import useModalVariableContext from '../../context/ModalShowVariable';
import './SpotReviewFormModal.css';
export default function SpotReviewForm() {
	const { spotId } = useParams();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(null);
	const [hover, setHover] = useState(null);
	const [errors, setErrors] = useState({});
	const { setShowModalReview } = useModalVariableContext();
	const dispatch = useDispatch();

	return (
		<div className="login-form-wrapper">
			<p className="close-login" onClick={() => setShowModalReview(false)}>
				x
			</p>
			<h4 className="login-title">How was your stay?</h4>
			<form className="login-form review-form">
				<div className="rating-text">Rating</div>
				<div className="stars-rating">
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;
						return (
							<label>
								<input
									className="star-input"
									type="radio"
									name="rating"
									value={stars}
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
				<button className="review-button">post!</button>
			</form>
		</div>
	);
}
