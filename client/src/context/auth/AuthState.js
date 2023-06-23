import React, { useReducer } from 'react';
import authContext from './AuthContext';
import authReducer from './AuthReducer';
import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load user
	const loadUser = async () => {
		console.log('loadUser function called');
		// console.log('Checking localStorage.token: ', localStorage.getItem('token'));
		// localStorage.token DOESN'T EXIST!!!
		if (localStorage.getItem('token') !== null) {
			// console.log(
			// 'There is a token in local storage, which is',
			// localStorage.getItem('token')
			// );
			setAuthToken(localStorage.getItem('token'));
		}
		try {
			console.log('Trying to call GET api/auth. This is step 1');
			const res = await axios.get('api/auth');
			console.log('axios.get api/auth successfully finished');
			console.log(res);

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (error) {
			// console.log('Error!');
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};

	// Register user
	const register = async (formData) => {
		console.log('register function called');
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			// console.log('Calling axios.post to register new user');
			const res = await axios.post('api/users', formData, config);
			// console.log(
			// `axios.post successfully finished, res is ${res} with token: ${res.data.token}`
			// );
			// NEW CODE I ADDED! -> This will make it work
			// localStorage.setItem('token', res.data.token);
			// console.log('Calling REGISTER_SUCCESS');
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			setTimeout(() => {
				loadUser();
			}, '100');

			// console.log('state is now ', state);
			// console.log('Calling loadUser function');
		} catch (err) {
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};
	// Login user
	const login = async (formData) => {
		console.log('login function called');
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			console.log('Calling POST api/auth to login user');
			const res = await axios.post('api/auth', formData, config);
			console.log(
				`axios.post successfully finished, res is ${res} with token: ${res.data.token}`
			);
			// NEW CODE I ADDED! -> This will make it work
			// localStorage.setItem('token', res.data.token);
			// console.log('Calling REGISTER_SUCCESS');
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			setTimeout(() => {
				// console.log('Delayed for 1 second');
				loadUser();
			}, 1000);
			// console.log('state is now ', state);
			// console.log('Calling loadUser function');
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
	};
	// Logout
	const logout = () => {
		dispatch({ type: LOGOUT });
	};
	// Clear errors
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS,
		});
	};
	return (
		<authContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
