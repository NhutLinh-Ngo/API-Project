import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import { Modal } from '../../context/Modal';
import useSearchBarActive from '../../context/SearchBarActive';

function SearchBar() {
	const history = useHistory();
	const [guests, setGuests] = useState(1);
	const [showDestinations, setShowDestinations] = useState(false);
	const { searchBarModalActive, setSearchBarModalActive } =
		useSearchBarActive();
	const [destination, setDestination] = useState();

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

	const tomorrow = new Date();
	const nextDay = new Date();
	tomorrow.setDate(tomorrow.getDate() + 2);
	nextDay.setDate(nextDay.getDate() + 5);

	const [checkInOutDate, setCheckInOutDate] = useState('');

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
		const onScroll = () => setSearchBarModalActive(false);

		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	const handleSearch = (e) => {};

	console.log(checkInOutDate, 'asdfsdfasdfsdfsd');
	return (
		<>
			<div className="searchBar-outer">
				<form onSubmit={handleSearch} className="searchBar-form">
					<div className="searchBar-input-wrapper" onClick={openMenu}>
						<label className="searchBar-label">Where</label>
						<input
							type="text"
							placeholder="Search destinations"
							className="searchBar-input"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							maxLength="140"
						/>
						{/* {showDestinations && (
						<div className="where-dropdown">
							<div className="where-dropdown-header">Popular Searches</div>
							<div
								className="where-selection"
								onClick={() => {
									setDestination('California');
									history.push(`/search/indonesia/${guests}`);
								}}
							>
								<img className="dropdown-clock" src={clock}></img>
								<div className="where-destination-outer">
									<div className="where-destination-header">
										California · Stays
									</div>
									<div className="where-destination-date">Any week</div>
								</div>
							</div>
							<div
								className="where-selection"
								onClick={() => {
									setDestination('Florida');
									history.push(`/search/thailand/${guests}`);
								}}
							>
								<img className="dropdown-clock" src={clock}></img>
								<div className="where-destination-outer">
									<div className="where-destination-header">
										Florida · Stays
									</div>
									<div className="where-destination-date">Any week</div>
								</div>
							</div>
						</div>
					)} */}
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
					<div className="searchBar-input-wrapper-date">
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
