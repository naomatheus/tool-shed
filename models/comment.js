const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const commentSchema = new mongoose.Schema({
	toolInfo: [{name: String, details: String}],
	location: Number, //zip code
	isAvailable: Boolean
	//comments: ({body: str, date: now})
});

/////^^^ NOT SURE ABOUT THE SYNTAX HERE ^^^//////

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE SCHEMA:");
console.log(commentSchema);

const Comment = mongoose.model('Comment', commentSchema);

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE MODEL:");
console.log(Comment);

