import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllSpots from './Components/AllSpots';
import Navigation from './Components/Navigation';
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
				<Navigation isLoaded={isLoaded} />
				<Switch>
					<Route exact path="/">
						<AllSpots />
					</Route>
				</Switch>
			</div>
		)
	);
}

export default App;
