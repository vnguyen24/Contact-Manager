import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	const navigate = useNavigate();
	useEffect(() => {
		// props.history.push() is deprecated!!! Use Navigate from react-router-dom instead
		if (isAuthenticated) {
			console.log('User is authenticated. Rendering home page');
			// <Navigate to='/' />; // ???
			navigate('/');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = user;

	const onChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmit = (event) => {
		// console.log('Submit button clicked');
		event.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please fill out all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			// console.log('Calling register function');
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
