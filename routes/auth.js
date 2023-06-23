const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // Brad used express-validator/check here?
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
	console.log('GET api/auth called. This is step 2');
	try {
		// console.log('Finding user');
		// console.log('req is ', req);
		// console.log('req.user is ', req.user);
		// console.log('req.user.id is ', req.user.id);
		const user = await User.findById(req.user.id).select('-password');
		console.log('User found:', user);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		// console.log('POST api/auth called');
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				'secret',
				{
					expiresIn: 3600000,
				},
				(err, token) => {
					if (err) throw err;
					// console.log('After calling jwt.sign, the token is', token);
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
