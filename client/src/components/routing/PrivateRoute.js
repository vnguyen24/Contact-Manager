import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Route, Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;

	if (loading) return <Spinner />;
	if (isAuthenticated) return <Component />;
	return <Navigate to='/login' />;
	// return (
	// 	<Route
	// 		{...rest}
	// 		render={(props) =>
	// 			!isAuthenticated && !loading ? (
	// 				<Navigate to='/login' />
	// 			) : (
	// 				<Component {...props} />
	// 			)
	// 		}
	// 	/>
	// );
};

export default PrivateRoute;
