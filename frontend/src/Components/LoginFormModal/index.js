import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import useModalVariableContext from '../../context/ModalShowVariable';
import './LoginFormPage.css';
export default function LoginFormPage() {
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [hasSummited, setHasSummited] = useState(false);

	const dispatch = useDispatch();

	const { setShowModalLogin, setShowModalSignup } = useModalVariableContext();

	const switchToSignupModal = () => {
		setShowModalLogin(false);
		setShowModalSignup(true);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		setHasSummited(true);

		return dispatch(sessionActions.login({ credential, password }))
			.then(() => setShowModalLogin(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	const handleDemo = (e) => {
		e.preventDefault();

		return dispatch(
			sessionActions.login({ credential: 'Cokeboi68', password: 'cokeboi123' })
		)
			.then(() => setShowModalLogin(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="login-form-wrapper">
			<p className="close-login" onClick={() => setShowModalLogin(false)}>
				x
			</p>
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
				<button className="login-submit-button" onClick={handleDemo}>
					Demo-User
				</button>
			</form>
			<h5>Welcome back to NhutBnB</h5>
			<p className="login-singup-toggle">
				Don't have an account?{' '}
				<span
					style={{
						cursor: 'pointer',
						fontSize: '14px',
						textDecoration: 'underline'
					}}
					onClick={switchToSignupModal}
				>
					{'  '}
					signup
				</span>
			</p>
		</div>
	);
}
