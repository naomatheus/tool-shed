const express 			= require('express');
const app 				= express();
const serveStatic 		= require('serve-static');
const ejs 				= require('ejs');
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const pathfinderUI 		= require('pathfinder-ui');
const session 			= require('express-session');
const multer  			= require('multer')
const upload 			= multer({ dest: 'uploads/' });
const fs 				= require('fs');

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

app.use(session({
	secret: 'It is a huuuge secret',
	resave: false,
	saveUninitialized: false,
}));


/// MIDDLEWARE ///


// require + use controllers 

const commentController = require('./controllers/commentController.js');


const toolController = require('./controllers/toolController.js');

const userController = require('./controllers/userController.js');

const authController = require('./controllers/authController.js')

// require controllers 
app.use('/users', userController);
app.use('/tools', toolController)
app.use('/comments', commentController)
app.use('/auth', authController);

// set default root // 
app.get('/', (req, res, next) => {
	res.render('/auth/login')
});
// set default root // 


/// listener

app.listen(3000, () => {
	console.log('LISTENING ON 3000');
})


/// listener

