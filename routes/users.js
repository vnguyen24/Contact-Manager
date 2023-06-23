const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // Brad used express-validator/check here?
const config = require('config');
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Please add name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		// console.log('Registering a user');
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save(); // Save user to MongoDB

			// console.log('User id is ', user.id);
			// console.log('User id.toString() is ', user.id.toString());
			const payload = {
				user: {
					id: user.id.toString(),
				},
			};

			jwt.sign(
				payload, // payload is user: id. We are converting this to a jsonwebtoken
				'secret',
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					// console.log('After calling jwt.sign, the token is', token);
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message); // Send message to console / terminal
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
