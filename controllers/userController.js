/// node modules
const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');
const session 			= require('express-session');

////WE NEED LOGIC HERE TO STATE THAT ONLY LOGGED IN SUPERUSERS (CLAYTON/MATT) CAN ACCESS THIS
///ENTIRE TREE.

/// require user model ///
const User = require('../models/user.js');

/// USER NEW ROUTE ///
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
});
/// END OF USER NEW ROUTE ///



/// INDEX GET ROUTE ///
router.get('/', async (req, res) => {
	try{
		const foundUsers = await User.find({});
		console.log('=============');
		console.log(`${foundUsers} <========= has been found in the USER INDEX GET ROUTE!!!`);
		console.log('=============');
		res.render('users/index.ejs', {
			users: foundUsers
		});

	}catch(err){
		res.send(err);
	}
});
/// END OF INDEX GET ROUTE ///



/// SHOW GET ROUTE ///
router.get('/:id', async (req, res) => {
	try{
		const foundUser = await User.findById({_id: req.params.id});
		console.log('=============');
		console.log(`${foundUser} <========== has hit the USER SHOW GET ROUTE!!!`);
		console.log('=============');
		res.render('users/show.ejs', {
			user: foundUser
		})
	}catch (err){
		res.send(err)
	}
});
/// SHOW GET ROUTE ///



/// EDIT GET ROUTE ////
router.get('/:id/edit', async (req, res) => {
	try{
		const foundUser = await User.findByIdAndUpdate({_id: req.params.id});
		console.log("===========");
		console.log(`${foundUser} <=========== has been found in the USER EDIT/UPDATE GET ROUTE!!!`);
		console.log("===========");
		res.render('users/edit.ejs', {
			user: foundUser
		});
	}catch(err){
		res.send(err);
	}
});
/// END OF EDIT GET ROUTE ////

/// CREATE/POST ROUTE///
router.post('/', async (req, res, next) => {
	try{
		const createdUser = await User.create(req.body);
		console.log('==============');
		console.log(`${createdUser}<====== user has been created in the USER POST ROUTE!!!`);
		console.log('==============');
		res.redirect('/users');
	}catch(err){
		// res.send(err);
		next(err);
	}
});
/// END OF CREATE/POST ROUTE///

/// EDIT PUT ROUTE ///
router.put('/:id', async (req, res) => {
	try{
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log('==============');
		console.log(`${updatedUser} <========== this user has been updated in the USER PUT ROUTE!!!`);
		console.log('==============');
		res.redirect('/users/' + req.params.id);
	}catch (err){
		res.send(err);
	}
});

/// DELETE ROUTE ////
router.delete('/:id', async (req, res) => {
	try{
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		console.log('=============');
		console.log(`${deletedUser} <========== this user will be deleted in the USER DELETE ROUTE!!!`);
		console.log('=============');
		// res.redirect('/users');
	}catch(err){
		res.send(err);
	}
});
/// END OF DELETE ROUTE ////







module.exports = router;