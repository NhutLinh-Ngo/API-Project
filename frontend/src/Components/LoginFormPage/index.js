import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginFormPage.css';
export default function LoginFormPage() {
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [hasSummited, setHasSummited] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) {
		return <Redirect to="/" />;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		setHasSummited(true);

		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			}
		);
	};
	return (
		<div className="login-form-wrapper">
			<p className="close-login">x</p>
			<h4 className="login-title">Login</h4>
			<form onSubmit={onSubmit} className="login-form">
				<div className="input">
					<input
						className="input-box"
						id="credential"
						name="credential"
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						placeholder="Username or Email"
						required
					/>
				</div>
				<div className="input">
					<input
						className="input-box"
						id="password"
						name="password"
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
				</div>
				{hasSummited &&
					errors.length > 0 &&
					errors.map((error, i) => (
						<div className="login_error" key={i}>
							{error}
						</div>
					))}
				<button type="submit" className="login-submit-button">
					Log In
				</button>
			</form>
			<h5>Welcome to AriBnb</h5>
		</div>
	);
}
