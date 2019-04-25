
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const toolSchema = new mongoose.Schema({
	timePosted: Date,
	text: String
});

/////^^^ NOT SURE ABOUT THE SYNTAX HERE ^^^//////

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE TOOLS SCHEMA:");
console.log(toolSchema);

const Tool = mongoose.model('Tool', toolSchema);

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE TOOLS MODEL:");
console.log(Tool);







module.exports = Tool;

