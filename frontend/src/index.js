import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider } from './context/Modal';
import { ModalVariableProviser } from './context/ModalShowVariable';
import { SearchBarActiveProvider } from './context/SearchBarActive';
import * as sessionActions from './store/session';
import * as spotsActions from './store/spots';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
	window.spotsActions = spotsActions;
}

const Root = () => {
	return (
		<Provider store={store}>
			<SearchBarActiveProvider>
				<ModalVariableProviser>
					<ModalProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</ModalProvider>
				</ModalVariableProviser>
			</SearchBarActiveProvider>
		</Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
