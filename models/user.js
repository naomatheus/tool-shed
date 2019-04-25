const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';
const Tool = require('./tool.js')

const userSchema = new mongoose.Schema({
	// toolAvailable: Boolean,
	userName: String, 
	email: String
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