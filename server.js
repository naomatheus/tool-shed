// THIS IS A COMMENT FROM CSS - HI MATT!!! CAN YOU SEEE THIS?!?!//
const express 			= require('express');
const app 				= express();
const serveStatic 		= require('serve-static');
const ejs 				= require('ejs');
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
// const pathfinderUI 		= require('pathfinder-ui');
const session 			= require('express-session');
const multer  			= require('multer')
const upload 			= multer({ dest: 'uploads/' });
const fs 				= require('fs');

// use dot env 
require('dotenv').config();
const PORT = process.env.PORT

////// node modules ////

/// require db ///
require('./db/db.js');
/// require db ///


/// middle ware ///
app.use(express.static('servestatic'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));



// app.use('/pathfinder', function(req, res, next){
//     pathfinderUI(app)
//     next()
// }, pathfinderUI.router)

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}));


app.use(function(req, res, next){
	res.locals.userId = req.session.usersDbId;
	res.locals.authenticated = !req.session.anonymous;
	next()
});

/// MIDDLEWARE ///


// require + use controllers 

const commentController = require('./controllers/commentController.js');

const toolController = require('./controllers/toolController.js');

const userController = require('./controllers/userController.js');

const authController = require('./controllers/authController.js')

// require controllers
app.use('/auth', authController);
app.use('/users', userController);
app.use('/tools', toolController)
app.use('/comments', commentController)

// set default root // 
app.get('/', (req, res, next) => {
	res.redirect('/auth/login')
});
// set default root // 

app.get('*', (req, res) => {
	res.send('404 - You are experiencing technical difficulties accessing the amazing tool-shed site...')
})


/// listener


app.listen(PORT, () => {
	console.log(`LISTENING ON ${PORT}`);
})


/// listener

