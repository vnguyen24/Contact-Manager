import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
// import AuthContext from '../../context/auth/AuthContext';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	// const authContext = useContext(AuthContext);
	const { contacts, filtered, getContacts, loading } = contactContext;
	// const { isAuthenticated } = authContext;
	console.log('contacts is initially', contacts);
	console.log('loading is initially', loading);

	useEffect(() => {
		console.log('calling getContacts');
		setTimeout(() => {
			// console.log('Delayed for 1 second');
			getContacts();
		}, 200);
		// getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
