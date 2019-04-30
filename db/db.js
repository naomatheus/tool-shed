const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.on('connected', () => {
		console.log('====================== mongoose connected on ======================', connectionString);
});

mongoose.connection.on('disconnected', () => {
		console.log('====================== mongoose connected on ======================', connectionString);
});

mongoose.connection.on('error', (err) => {
		console.log(`====================== mongoose error ======================${err}`);
});

