
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/toolshed';

const toolSchema = new mongoose.Schema({
	timePosted: Date,
	typeOfTool: String,
	description: String,
	toolAvailable: Boolean,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'// WHEN A NEW COMMENT GETS CREATED, IT WILL ALSO BE PUSHED INTO THE TOOL'S COMMENT ARRAY
	}],
	owner: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
		/// WHEN CREATING TOOL Tool.owner = req.session.user
	},
 	toolImage: { 
 		data: Buffer, 
 		contentType: String,
 		description: String } 
});



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

