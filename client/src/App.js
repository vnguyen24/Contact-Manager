import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login.js';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.getItem('token') !== null) {
	setAuthToken(localStorage.getItem('token'));
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment className='App'>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Routes>
									<Route
										exact
										path='/'
										element={<PrivateRoute component={Home} />}
									/>
									<Route exact path='/about' Component={About} />
									<Route exact path='/register' Component={Register} />
									<Route exact path='/login' Component={Login} />
								</Routes>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
