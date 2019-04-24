const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

mongoose.connect(connectionString, {
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

