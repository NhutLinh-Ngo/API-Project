import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import useModalVariableContext from '../../context/ModalShowVariable';
import logo from '../../assets/logo.png';
import SearchBar from '../SearchBar';
import './Navigation.css';
function Navigation({ isLoaded }) {
	const { spotId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();

	const [showMenu, setShowMenu] = useState(false);
	const {
		showModalLogin,
		setShowModalLogin,
		showModalSignup,
		setShowModalSignup
	} = useModalVariableContext();
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [checkInOutDate, setCheckInOutDate] = useState('');
	const [destination, setDestination] = useState('');
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
			<div className="nav-bar-loggedIn nav-bar-component">
				<button onClick={openMenu} className="navbar-button">
					<i class="fa-solid fa-bars"></i>
					<i class="fa-solid fa-circle-user"></i>
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
				</button>
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
		<>
			<div
				className={`navbar-wrapper ${
					showSearchBar ? 'search-modal-active' : ''
				}`}
			>
				<div className={`navbar-content ${spotId ? 'navbar-max-width' : ''}`}>
					<div className="nav-bar-component">
						<img
							className="image-link-home"
							src={logo}
							onClick={() => history.push('/')}
						/>
					</div>
					{!showSearchBar && (
						<div
							className="nav-bar-component center start-search-button-wrapper"
							onClick={() => setShowSearchBar(true)}
						>
							<div className="start-search-button">
								<div className="start-your-search">Start your search</div>
								<div className="magnifying-glass">
									<i class="fa-solid fa-magnifying-glass"></i>
								</div>
							</div>
						</div>
					)}
					{isLoaded && sessionLinks}
				</div>
				{showSearchBar && (
					<SearchBar
						setShowSearchBar={setShowSearchBar}
						checkInOutDate={checkInOutDate}
						setCheckInOutDate={setCheckInOutDate}
						destination={destination}
						setDestination={setDestination}
					/>
				)}
			</div>
		</>
	);
}

export default Navigation;
