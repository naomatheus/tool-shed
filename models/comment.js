const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const commentSchema = new mongoose.Schema({
	whenCommentPosted: Date,
	commentBody: String,
	commentAuthor: String
});


// console.log("");
// console.log("");
// console.log("");
// console.log("THIS IS THE COMMENT SCHEMA:");
// console.log(commentSchema);

const Comment = mongoose.model('Comment', commentSchema);

// console.log("");
// console.log("");
// console.log("");
// console.log("THIS IS THE COMMENT MODEL:");
// console.log(Comment);

module.exports = Comment;

