import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// Remove this so that useEffect is not called twice
	// <React.StrictMode>
	<App />
	// {/* </React.StrictMode> */}
);
