import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};
	// NO USE EFFECT: INFINITE SPINNER; KICKS YOU OUT WHEN RELOAD PAGE

	// WORKS FINE, BUT LOGS YOU OUT WHEN RELOAD PAGE
	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		console.log('NavBar is calling loadUser()');
	// 		authContext.loadUser();
	// 	}
	// 	// eslint-disable-next-line
	// }, [isAuthenticated]);

	// DOESN'T LOG YOU OUT WHEN RELOAD PAGE, FIRST RENDER IS WHATEVER WAS THE PREVIOUS LOGIN, MUST RELOAD PAGE FOR THE CONTACTS TO APPEAR.
	useEffect(() => {
		console.log('NavBar is calling loadUser()');
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a href='#!' onClick={onLogout}>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};

export default Navbar;
