const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	console.log('auth in middleware called');
	console.log('req is initially', req);
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	console.log('Checking for token inside auth.js middleware: ', token);
	try {
		const decoded = jwt.verify(token, 'secret');
		// console.log(decoded);
		req.user = decoded.user;
		console.log('req.user in auth middleware is ', req.user);
		next();
	} catch (err) {
		console.log('console: Token is not valid');
		res.status(400).json({ msg: 'Token is not valid' });
	}
};
