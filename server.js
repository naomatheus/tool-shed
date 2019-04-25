const express 			= require('express');
const app 				= express();
const serveStatic 		= require('serve-static');
const ejs 				= require('ejs');
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const pathfinderUI 		= require('pathfinder-ui');
////// node modules //// 

/// require db ///
require('./db/db.js');
/// require db ///


/// middle ware ///

app.use(express.static('servestatic'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/pathfinder', function(req, res, next){
    pathfinderUI(app)
    next()
}, pathfinderUI.router)

/// MIDDLEWARE ///


// require + use controllers 

// const commentController = require('./controllers/commentController.js');
// app.use('/comments', commentController)

const toolController = require('./controllers/toolController.js');

const userController = require('./controllers/userController.js');

// require controllers 
app.use('/users', userController);
app.use('/tools', toolController)

/// listener

app.listen(3000, () => {
	console.log('LISTENING ON 3000');
})


/// listener

