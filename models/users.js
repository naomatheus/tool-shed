const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const userSchema = new mongoose.Schema({
	contactInfo: [name: String, email: String],
	//tool object pushed via toolSchema
});

/////^^^ NOT SURE ABOUT THE SYNTAX HERE ^^^//////

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE user SCHEMA:");
console.log(userSchema);

const User = mongoose.model('User', userSchema);

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE user MODEL:");
console.log(User);