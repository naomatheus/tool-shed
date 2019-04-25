const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const commentSchema = new mongoose.Schema({
	toolInfo: [{name: String, details: String}],
	// does there need to be an ID here that receives the information about which tool the comment was posted on? like this next line??? 
	whenCommentPosted: Date,
	commentBody: String,
	// DOES THE COMMENT MODEL NEED TO REFERENCE TOOL DOCUMENTS TO SHOW WHICH TOOL IT WAS POSTED ON??? NO because it will be on that page anyway toolDoc: [{type: mongoose.Schema.Types.ObjectId, ref:'Tool'}],
	userDoc: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]

});



console.log("");
console.log("");
console.log("");
console.log("THIS IS THE COMMENT SCHEMA:");
console.log(commentSchema);

const Comment = mongoose.model('Comment', commentSchema);

console.log("");
console.log("");
console.log("");
console.log("THIS IS THE COMMENT MODEL:");
console.log(Comment);

module.exports = Comment;

