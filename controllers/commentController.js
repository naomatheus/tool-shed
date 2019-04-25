const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');
/// node modules

/// require comments model ///
const Comment = require('../models/comment.js');
/// require comments model ///

/// comment new route ///
router.get('/new', (req, res) => {
	res.render('comments/new.ejs')	
})
/// comment new route ///

//// INDEX GET ROUTE ///

router.get('/', async (req, res) => {
	try {
		const foundComments = await Comment.find({});
		console.log('=============');
		console.log(`${foundComments}, <====== has been found in the COMMENT INDEX GET ROUTE`);
		console.log('=============');
		res.render('comments/index.ejs', {
			comments: foundComments
		})
	} catch (err) {
		res.send(err)
	}
})
//// END OF INDEX GET ROUTE ///

//// SHOW GET ROUTE /// 
router.get('/:id', async (req, res) => {
	try {
		const foundComment	= Comment.findById({_id: req.params.id});	
		console.log('=============');
		console.log(`${foundComment}, <====== has been found in the COMMENT SHOW GET ROUTE`);
		console.log('=============');
		res.render('comments/show.ejs', {
			comment: foundComment
		})
	} catch (err) {
		res.send(err)
	}
})

//// END OF SHOW GET ROUTE /// 

//// COMMENT EDIT GET ROUTE ////

router.get('/:id/edit', async (req, res) => {
	try {
		const foundComment = await Comment.findByIdAndUpdate({_id: req.params.id});
		console.log('=============');
		console.log(`${foundComment}, <====== has been found in the COMMENT EDIT/UPDATE GET ROUTE`);
		console.log('=============');
		res.render('comments/edit.ejs', {
			comment: foundComment 
		});
	} catch (err) {
		res.send(err)
	}	
})

//// COMMENT EDIT GET ROUTE ////

//// CREATE/POST ROUTE ///// 
router.post('/', async (req, res) => {
	try {
		const createdComment = await Comment.create(req.body);
		console.log('=============');
		console.log(`${createdComment}, <====== has been created by the COMMENT POST ROUTE`);
		console.log('=============');
		res.redirect('/comments')
	} catch (err) {
		res.send(err)
	}
})

//// END OF CREATE/POST ROUTE ///// 

//// EDIT/PUT ROUTE ////
router.put('/:id', async (req, res) => {
	
	try {
		const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log('=============');
		console.log(`${updatedComment}, <====== has been updated by the COMMENT EDIT/PUT ROUTE`);
		console.log('=============');
		res.redirect('/comments/' + req.params.id)

	} catch (err){
		res.send(err)
	}
})
//// END OF  EDIT/PUT ROUTE ////

///// DELETE ROUTE /// 
router.delete('/:id', async (req, res) => {
	
	try {
		const deletedComment = await Comment.findByIdAndRemove(req.params.id);
		console.log('=============');
		console.log(`${deletedComment}, <====== will be deleted by the COMMENT DELETE ROUTE`);
		console.log('=============');
		res.redirect('/comments')
	} catch (err) {
		res.send(err)
	}
})

///// END OF DELETE ROUTE /// 


//// export router

module.exports = router;