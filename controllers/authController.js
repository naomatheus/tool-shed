const express = require('express');
const router = express.Router();
const mongoose 			= require('mongoose');
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');


/// MAKE A login route that will simulate or actually be a user login
router.get('/login', (req, res) => {
	res.render('login.ejs');
})

/// make the form in login.ejs make a request to this
router.post('/login', (req, res) => {
	// setting req.session property called username that is equal to the username from the login form
	req.session.username = req.body.username;
	// logged in property
	req.session.logged = false //default value is false and will be changed to true by this request;
	res.redirect('/home')/// redirect to the homepage

});


/// will pronbabyl to ASYNC both of these ROUTES ^^^^^^ and BELOW ______

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send(err)
		} else {
			res.redirect('/auth/login')
		}
	})	
})


module.exports = router;