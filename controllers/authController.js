const express 			= require('express');
const router 			= express.Router();
const mongoose 			= require('mongoose');
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');
const User 				= require('../models/user.js');
const bcrypt 			= require('bcryptjs');
const session 			= require('express-session');


/// MAKE A login route that will simulate or actually be a user login
router.get('/login', (req, res) => {
	res.render('login.ejs', {
		message: req.session.message
	})
});
///END OF LOGIN GET USER ROUTE

/// REGISTRATION GET USER ROUTE
router.get('/register', (req, res) => {
		res.render('register.ejs', {
			message: req.session.message
		})	
});
/// END OF REGISTRATION GET USER ROUTE

/// REGISTRATION POST USER ROUTE
router.post('/register', async (req, res, next) => {
	const queriedUserName = User.findOne(req.body.userName);
	if (queriedUserName === req.body.userName){
		console.log(`${queriedUserName} ALREADY EXISTS!!!`);
		res.redirect('/auth/login');
	} else {
		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const userDbEntry = {};
		userDbEntry.username = req.body.userName;
		userDbEntry.password = passwordHash;
	 try{	
		const createdUser = await User.create(userDbEntry);
		console.log("=================");
		console.log(`${createdUser} <======= user has been created in REGISTER POST USER ROUTE`);
		console.log("=================");
		console.log(req.session);
		req.session.logged = true;
		req.session.usersDbId = createdUser._id;
		res.redirect('/auth/login');  ///not sure about redirect site
	}catch(err){
		next(err)
		res.send(err);
	}}
});
/// END OF REGISTRATION POST USER ROUTE



/// POST USER LOGIN ROUTE
/// make the form in login.ejs make a request to this
router.post('/login', async (req, res, next) => { 
	try{ 
		const foundUser = await User.findOne({'userName': req.body.username});
		if(foundUser === req.body.userName) {
		 // console.log(bcrypt.compareSync(req.body.password, foundUser.password) === true);
			////// HAVING ISSUES HERE - DONT' THINK THE ROUTE IS EVER HITTING THE BLOCK BELOW///////
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true) {
				req.session.message = '';
				req.session.logged = true;
				req.session.username = req.body.username;
				req.session.usersDbId = foundUser._id;
				console.log(`${req.session} <===== SUCCESSFUL LOGIN!`);
				res.redirect('/tools') ///not sure about redirect site
			} else {
				req.session.message = "Username or password is incorrect";
				res.redirect('/auth/login')//
			}
		}else {
			req.session. message = "Username or password is incorrect"
			res.redirect('/auth/login');//
		}
	} catch(err){
		next(err);
		res.send(err);
		// logged in property
		// req.session.logged = false //default value is false and will be changed to true by this request;
		// res.redirect('/auth/login')/// redirect to the homepage
	}
	// setting req.session property called username that is equal to the username from the login form
});
/// END OF POST USER LOGIN ROUTE




/// will probably to ASYNC both of these ROUTES ^^^^^^ and BELOW ______
/// GET LOGOUT USER ROUTE (DESTROY)
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send(err)
		} else {
			res.redirect('/login')
		}
	})	
});
/// END OF LOGOUT USER ROUTE (DESTROY)

module.exports = router;