import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

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

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<div className="nav-bar-loggedIn">
			<NavLink to="/lets-make-money" className="become-host">
				Become a host
			</NavLink>
			<button onClick={openMenu} className="navbar-button">
				<i class="fa-solid fa-bars"></i>
				<i class="fa-solid fa-circle-user"></i>
			</button>
			{showMenu && (
				<ul className="nav-dropped-down">
					<li className="signedin-li">
						<span>welcome back,</span> {user.firstName}
					</li>
					<li className="signedin-li">
						<span>email:</span> {user.email}
					</li>
					<li className="signedin-li">
						<button onClick={logout}>Log Out</button>
					</li>
				</ul>
			)}
		</div>
	);
}

export default ProfileButton;
