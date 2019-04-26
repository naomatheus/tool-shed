const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';
const Tool = require('./tool.js')

const userSchema = new mongoose.Schema({
	// toolAvailable: Boolean,
	userName: String, 
	email: String,
	password: String
<<<<<<< HEAD
=======

>>>>>>> 569fc8e49dcfd6479dc4ac2119f579c517d3ad84
	//tool documents from MongoDB will pushed via reference to "Tool" collection in MongoDB
	// I named this toolDoc, so semantically the Tool documents are being pushed into the User documents that create them - M
});

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

module.exports = User;