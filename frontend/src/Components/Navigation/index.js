import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import useModalVariableContext from '../../context/ModalShowVariable';
import logo from '../../assets/logo.png';
import './Navigation.css';
function Navigation({ isLoaded }) {
	const { spotId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const {
		showModalLogin,
		setShowModalLogin,
		showModalSignup,
		setShowModalSignup
	} = useModalVariableContext();
	let sessionLinks;

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div className="nav-bar-loggedIn">
				<button onClick={openMenu} className="navbar-button">
					<i class="fa-solid fa-bars"></i>
					<i class="fa-solid fa-circle-user"></i>
				</button>
				{showMenu && (
					<ul className="nav-dropped-down">
						<li
							className="nav-dropped-down-li"
							onClick={() => setShowModalLogin(true)}
						>
							Log In
						</li>
						<li
							className="nav-dropped-down-li"
							onClick={() => setShowModalSignup(true)}
						>
							Sign Up
						</li>
					</ul>
				)}
				{showModalLogin && (
					<Modal onClose={() => setShowModalLogin(false)}>
						<LoginForm />
					</Modal>
				)}
				{showModalSignup && (
					<Modal onClose={() => setShowModalSignup(false)}>
						<SignupFormPage />
					</Modal>
				)}
			</div>
		);
	}

	return (
		<div className={`navbar-wrapper`}>
			<div className={`navbar-content ${spotId ? 'navbar-max-width' : ''}`}>
				<NavLink exact to="/">
					<img
						src={logo}
						style={{
							height: '45px',
							width: '100px',
							display: 'flex',
							alignItems: 'center',
							marginTop: '10px'
						}}
					/>
				</NavLink>
				{isLoaded && sessionLinks}
			</div>
		</div>
	);
}

export default Navigation;
