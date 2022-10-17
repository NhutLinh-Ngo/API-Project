import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllSpots from './Components/AllSpots';
import Navigation from './Components/Navigation';
import SingleSpotDetails from './Components/SingleSpotDetails';
import CreateSpotFormPage from './Components/CreateSpotFormPage';
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
				<Switch>
					<Route exact path="/">
						<Navigation isLoaded={isLoaded} />
						<AllSpots />
					</Route>
					<Route path="/spots/:spotId">
						<Navigation isLoaded={isLoaded} />
						<SingleSpotDetails />
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
