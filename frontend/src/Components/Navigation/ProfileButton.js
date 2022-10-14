import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
		<>
			<button onClick={openMenu} className="navbar-button signed-in">
				<i class="fa-sharp fa-solid fa-user"></i>
			</button>
			{showMenu && (
				<ul className="nav-dropped-down">
					<li className="signedin-li">
						<span>user:</span> {user.username}
					</li>
					<li className="signedin-li">
						<span>email:</span> {user.email}
					</li>
					<li className="signedin-li">
						<button onClick={logout}>Log Out</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;