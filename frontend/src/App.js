import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './Components/LoginFormPage';
function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					Home Page
				</Route>
				<Route path="/login">
					<LoginFormPage />
				</Route>
				<Route>Page Not Found</Route>
			</Switch>
		</div>
	);
}

export default App;
