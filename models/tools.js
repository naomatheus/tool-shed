
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const toolsSchema = new mongoose.Schema({
	timePosted: Iso(date.time),
	text: String
});

/////^^^ NOT SURE ABOUT THE SYNTAX HERE ^^^//////

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE TOOLS SCHEMA:");
console.log(toolsSchema);

const Tools = mongoose.model('Tools', toolsSchema);

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE TOOLS MODEL:");
console.log(Tools);







module.exports = Tools;

