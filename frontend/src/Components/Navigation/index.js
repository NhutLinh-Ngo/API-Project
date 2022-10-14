import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
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
			<>
				<button onClick={openMenu} className="navbar-button">
					<i class="fa-solid fa-bars"></i>
					<i class="fa-solid fa-circle-user"></i>
				</button>
				{showMenu && (
					<ul className="nav-dropped-down">
						<li className="nav-dropped-down-li">
							{' '}
							<NavLink
								to="/login"
								style={{
									paddingLeft: 5,
									textDecoration: 'none',
									width: '100%',
									color: 'black'
								}}
							>
								Log In
							</NavLink>
						</li>
						<li className="nav-dropped-down-li">
							<NavLink
								to="/signup"
								style={{
									paddingLeft: 5,
									textDecoration: 'none',
									width: '100%',
									color: 'black'
								}}
							>
								Sign Up
							</NavLink>
						</li>
					</ul>
				)}
			</>
		);
	}

	return (
		<div className="navbar-wrapper">
			<NavLink exact to="/">
				Home
			</NavLink>
			{/* <ul className="navbar-ul">
				<li>{isLoaded && sessionLinks}</li>
			</ul> */}
			{isLoaded && sessionLinks}
		</div>
	);
}

export default Navigation;
