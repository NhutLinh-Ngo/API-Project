import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import { Modal } from '../../context/Modal';
import useSearchBarActive from '../../context/SearchBarActive';
import { usaCities } from 'typed-usa-states';
import states from '../../utilz/state';

function SearchBar({
	setShowSearchBar,
	checkInOutDate,
	setCheckInOutDate,
	destination,
	setDestination
}) {
	const history = useHistory();
	const searchInputRef = useRef(null);
	const [showDestinations, setShowDestinations] = useState(false);
	const { searchBarModalActive, setSearchBarModalActive } =
		useSearchBarActive();
	const [searchLocationResult, setSearchLocationResult] = useState([]);

	const openMenu = () => {
		if (showDestinations) return;
		setShowDestinations(true);
	};

	useEffect(() => {
		if (!showDestinations) return;

		const closeMenu = () => {
			setShowDestinations(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showDestinations]);

	//Search result finder
	useEffect(() => {
		const allStateArr = Object.keys(states);
		if (destination.length) {
			let matches = [];
			let search = destination.toLowerCase();
			const handleSearch = () => {
				// Search by state first
				allStateArr.forEach((state) => {
					if (state.toLowerCase().startsWith(search)) {
						let foundState = `${state}, United States`;
						matches.push(foundState);
					}
				});
				for (let i = 0; i < usaCities.length; i++) {
					let state = usaCities[i].state;
					let city = usaCities[i].name;
					// then search by city
					if (city.toLowerCase().includes(search)) {
						let foundCity = `${city}, ${states[state]}`;
						matches.push(foundCity);
					}
				}

				setSearchLocationResult(matches.slice(0, 6));
			};

			handleSearch();
		} else setSearchLocationResult([]);
	}, [destination]);

	const tomorrow = new Date();
	const nextDay = new Date();
	tomorrow.setDate(tomorrow.getDate() + 2);
	nextDay.setDate(nextDay.getDate() + 5);

	// format calander date
	const formatDate = (date, key) => {
		const day = new Date(date).toDateString().toString();
		return day.split(' ')[0].split('').slice(0, 2).join('');
	};

	useEffect(() => {
		if (searchBarModalActive) {
			// appending the calendar to the modal div
			const div = document.getElementById('search-bar-modal');
			const calendar = document.getElementsByClassName('search-calendar');
			const clearDate = document.getElementById('clear-date');
			div.prepend(clearDate);
			div.append(calendar[0]);
		}
	}, [searchBarModalActive]);

	useEffect(() => {
		const onScroll = () => {
			setSearchBarModalActive(false);
			setShowSearchBar(false);
		};

		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (!checkInOutDate && !destination) {
			return setShowSearchBar(false);
		}
		const checkInDate = checkInOutDate[0]
			? new Date(checkInOutDate[0]).toJSON().slice(0, 10).toString()
			: '';
		const checkOutDate = checkInOutDate[1]
			? new Date(checkInOutDate[1]).toJSON().slice(0, 10).toString()
			: '';
		history.push(
			`/?desc=${destination}&checkIn=${checkInDate}&checkOut=${checkOutDate}`
		);
		setCheckInOutDate('');
		setDestination('');
		setShowSearchBar(false);
	};

	return (
		<>
			<div className="searchBar-outer">
				<form onSubmit={handleSearchSubmit} className="searchBar-form">
					<div
						className="searchBar-input-wrapper"
						onClick={(e) => {
							e.stopPropagation();
							openMenu();
							setSearchBarModalActive(false);
							searchInputRef.current.focus();
						}}
					>
						<label className="searchBar-label">Where</label>
						<input
							type="text"
							placeholder="Search destinations"
							className="searchBar-input"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							maxLength="140"
							ref={searchInputRef}
						/>
					</div>
					<div
						className="searchBar-input-wrapper-date"
						onClick={() => setSearchBarModalActive(true)}
					>
						<label className="searchBar-label">Check In</label>
						<div
							id="add-date"
							className={`${checkInOutDate ? 'have-date-selected' : ''}`}
						>
							{checkInOutDate
								? new Date(checkInOutDate[0]).toLocaleDateString()
								: 'Add dates'}
						</div>
					</div>
					<div
						className="searchBar-input-wrapper-date"
						onClick={() => setSearchBarModalActive(true)}
					>
						<label className="searchBar-label">Check Out</label>
						<div
							id="add-date"
							className={`${checkInOutDate ? 'have-date-selected' : ''}`}
						>
							{checkInOutDate
								? new Date(checkInOutDate[1]).toLocaleDateString()
								: 'Add dates'}
						</div>
					</div>
					<div className="searchBar-button-div center">
						<button type="submit" className="searchBar-button center">
							<i class="fa-solid fa-magnifying-glass"></i>
							<div>Search</div>
						</button>
					</div>
				</form>
				{showDestinations && searchLocationResult.length > 0 && (
					<div className="search-result-wrapper">
						{searchLocationResult.map((result) => (
							<div
								id="search-each-result-wrapper"
								onClick={() => setDestination(result)}
							>
								<div id="search-each-result-icon" className="center">
									<i class="fa-solid fa-location-dot"></i>
								</div>
								<div id="search-each-result">{result}</div>
							</div>
						))}
					</div>
				)}
			</div>
			{searchBarModalActive && (
				<Modal onClose={() => setSearchBarModalActive(false)}>
					<div id="search-bar-modal">
						<DateRangePicker
							onChange={setCheckInOutDate}
							value={checkInOutDate}
							minDate={new Date()}
							isOpen={true}
							rangeDivider={false}
							showDoubleView={true}
							monthPlaceholder={'mm'}
							yearPlaceholder={'yyyy'}
							dayPlaceholder={'dd'}
							showNeighboringMonth={false}
							clearIcon={
								<div id="clear-date" className="center">
									Clear dates
								</div>
							}
							goToRangeStartOnSelect={false}
							showFixedNumberOfWeeks={false}
							view={'month'}
							formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
							calendarClassName="search-calendar"
							className="search-daterange-box"
						/>
					</div>
				</Modal>
			)}
		</>
	);
}

export default SearchBar;
