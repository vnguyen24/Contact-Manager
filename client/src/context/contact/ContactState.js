import React, { useReducer } from 'react';
// import { v4 as uuid } from 'uuid';
import contactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
	GET_CONTACTS,
	CLEAR_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
} from '../types';
import axios from 'axios';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};
	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get contacts
	const getContacts = async () => {
		console.log('getContacts called');
		try {
			console.log('Calling GET api/contacts');
			const res = await axios.get('/api/contacts');
			console.log(
				'GET api/contacts successfully returned. Dispatching GET_CONTACTS'
			);
			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			});
		}
	};

	// Add contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);

			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};
	// Delete contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Update contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Clear contacts
	const clearContacts = (id) => {
		dispatch({ type: CLEAR_CONTACTS });
	};
	// Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};
	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<contactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
