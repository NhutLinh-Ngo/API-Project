import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import useModalVariableContext from '../../context/ModalShowVariable';
import './SignupFormPage.css';

export default function SignupFormPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [username, setUsername] = useState('');
	const [hasSubmit, setHasSubmit] = useState(false);
	const [errors, setErrors] = useState({});
	const { setShowModalLogin, setShowModalSignup } = useModalVariableContext();

	const switchToLoginModal = () => {
		setShowModalLogin(true);
		setShowModalSignup(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setHasSubmit(true);
		if (password !== confirmPassword) {
			return setErrors({ confirmPassword: 'Passwords do not match!' });
		}

		setErrors({});
		const signupInfo = {
			firstName,
			lastName,
			email,
			username,
			password
		};

		return dispatch(sessionActions.signup(signupInfo))
			.then(() => setShowModalSignup(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div className="signup-form-wrapper">
			<p className="close-login" onClick={() => setShowModalSignup(false)}>
				x
			</p>
			<h4 className="login-title">Signup</h4>
			<form onSubmit={onSubmit} className="login-form">
				<div className="signup-input">
					<input
						className="input-box"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error1">
						{errors.firstName ? errors.firstName : null}
					</div>
				)}
				<div className="signup-input">
					<input
						className="input-box"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error2">
						{errors.lastName ? errors.lastName : null}
					</div>
				)}
				<div className="signup-input">
					<input
						className="input-box"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error3">
						{errors.email ? errors.email : null}
					</div>
				)}
				<div className="signup-input">
					<input
						className="input-box"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error4">
						{errors.username ? errors.username : null}
					</div>
				)}
				<div className="signup-input">
					<input
						className="input-box"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error5">
						{errors.password ? errors.password : null}
					</div>
				)}
				<div className="signup-input">
					<input
						className="input-box"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						// required
					/>
				</div>
				{hasSubmit && (
					<div className="signup-error6">
						{errors.confirmPassword ? errors.confirmPassword : null}
					</div>
				)}
				<button type="submit" className="signup-submit-button">
					Sign Up
				</button>
			</form>
			<p className="login-singup-toggle">
				Already have an account?{' '}
				<span
					style={{
						cursor: 'pointer',
						fontSize: '14px',
						textDecoration: 'underline'
					}}
					onClick={switchToLoginModal}
				>
					{'  '}
					Login
				</span>
			</p>
		</div>
	);
}
