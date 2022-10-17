import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import useModalVariableContext from '../../context/ModalShowVariable';

export default function SpotReviewForm() {
	const { spotId } = useParams();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(null);
	const [errors, setErrors] = useState({});
	const { setShowModalReview } = useModalVariableContext();
	const dispatch = useDispatch();

	return (
		<div className="login-form-wrapper">
			<p className="close-login" onClick={() => setShowModalReview(false)}>
				x
			</p>
			<h4 className="login-title">How was your stay?</h4>
			<form className="login-form">
				<label class="review-text"></label>
			</form>
		</div>
	);
}
