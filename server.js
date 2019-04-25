const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pathfinderUI = require('pathfinder-ui');
////// node modules //// 

/// require db ///
require('./db/db.js');
/// require db ///


/// middle ware ///

// app.use(express.static('files'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/pathfinder', function(req, res, next){
    pathfinderUI(app)
    next()
}, pathfinderUI.router)

/// middle ware ///


// require + use controllers 

// const commentController = require('./controllers/commentController.js');
// app.use('/comments', commentController)

const toolController = require('./controllers/toolController.js');
app.use('/tools', toolController)

// const userController = require('./controllers/userController.js');
// app.use('/users', userController);

// require controllers 

/// listener

app.listen(3000, () => {
	console.log('LISTENING ON 3000');
})


/// listener

