const express 			= require('express');
const router 			= express.Router();
const mongoose 			= require('mongoose');
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');
const User 				= require('../models/user.js');
const brcypt 			= require('bcryptjs');


/// MAKE A login route that will simulate or actually be a user login
router.get('/login', (req, res) => {
	res.render('login.ejs', {
		message: req.session.message
	})
});
///END OF LOGIN GET USER ROUTE

/// REGISTRATION GET USER ROUTE
router.get('/register', (req, res) => {
		res.render('register.ejs')	
});
/// END OF REGISTRATION GET USER ROUTE

router.post('/register', async (req, res) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	try{
		const createdUser = await User.create(userDbEntry);
		req.session.logged = true;
		req.session.usersDbId = createdUser._id;
		res.redirect('/users');  ///not sure about redirect site
	}catch(err){}
	res.send(err);
});


/// make the form in login.ejs make a request to this
router.post('/login', async (req, res) => {
	try{
		const foundUser = await User.findOne({'username': req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				req.session.message = '';
				req.session.logged = true;
				req.session.usersDbId = foundUser._id;
				console.log(`${req.session} <===== SUCCESSFUL LOGIN!`);
				res.redirect('/tools') ///not sure about redirect site
			} else {
				req.session.message = "Username or password is incorrect";
				res.redirect('/auth/login')//
			}
		}else {
			req.session. message = "Username or passowrd is incorrect"
			res.redirect('/auth/login');//
		}
	} catch(err){
		res.send(err);
	}
	// setting req.session property called username that is equal to the username from the login form
	req.session.username = req.body.username;
	// logged in property
	req.session.logged = false //default value is false and will be changed to true by this request;
	res.redirect('/home')/// redirect to the homepage
});





/// will pronbably to ASYNC both of these ROUTES ^^^^^^ and BELOW ______
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send(err)
		} else {
			res.redirect('/auth/login')
		}
	})	
});


module.exports = router;