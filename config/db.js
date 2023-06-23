const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // Get the long URI link

const connectDB = async () => {
	try {
		await mongoose.connect(db); // Connect to database using the given URI link
		console.log('MongoDB connected');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
