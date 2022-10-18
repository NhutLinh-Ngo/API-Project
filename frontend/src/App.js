import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllSpots from './Components/SpotsGetAll';
import Navigation from './Components/Navigation';
import SingleSpotDetails from './Components/SpotDetails';
import CreateSpotFormPage from './Components/SpotCreateFormPage';
import UpdateListingForm from './Components/SpotUpdateListingForm';
import ScrollToTop from './Components/ZScrollToTop';
import * as sessionActions from './store/session';
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		isLoaded && (
			<div className="main-page-wrapper">
				<ScrollToTop />
				<Switch>
					<Route exact path="/">
						<Navigation isLoaded={isLoaded} />
						<AllSpots />
					</Route>
					<Route exact path="/spots/:spotId">
						<Navigation isLoaded={isLoaded} />
						<SingleSpotDetails />
					</Route>
					<Route path="/spots/:spotId/update">
						<UpdateListingForm />
					</Route>
					<Route path="/lets-make-money">
						<CreateSpotFormPage />
					</Route>
				</Switch>
			</div>
		)
	);
}

export default App;
