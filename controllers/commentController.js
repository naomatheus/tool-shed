const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
// const pathfinderUI 		= require('pathfinder-ui');
/// node modules

/// require comments model ///
const Comment = require('../models/comment.js');
const Tool = require('../models/tool.js');
/// require comments model ///

/// comment new route ///
router.get('/:toolId/new', async (req, res, next) => {

	try {
		const tool = await Tool.findById(req.params.toolId);

		///may want to change this object reference

		console.log('----------------');
		console.log('this is the tool in comment new route');
		console.log(tool);
		console.log('----------------');
		res.render('comments/new.ejs', {
			tool: tool
		})	

	}
	catch(err) {
		next(err)
	}

});
		//// if this doesn't work we'll have to query the tool id from the parameter
		//// that we have in the root
//// IN THIS PAGE WE ARE TRYING TO REFERENCE THAT SPECIFIC TOOL'S ID SO THAT THE ROUTE KNOWS
///  WHERE TO PLACE THE COMMENT!!!///
/// comment new route ///


//// INDEX GET ROUTE ///
router.get('/', async (req, res, next) => {
	try {
		const foundComments = await Comment.find({});
		console.log('=============');
		console.log(`${foundComments}, <====== has been found in the COMMENT INDEX GET ROUTE`);
		console.log('=============');
		


		res.render('comments/index.ejs', {
			comments: foundComments,

		})
	} catch (err) {
		next(err)
	}
})
//// END OF INDEX GET ROUTE ///

//// SHOW GET ROUTE /// 
router.get('/:id', async (req, res, next) => {
	try {
		const foundComment	= Comment.findById({_id: req.params.id});	
		console.log('=============');
		console.log(`${foundComment}, <====== has been found in the COMMENT SHOW GET ROUTE`);
		console.log('=============');
		res.render('comments/show.ejs', {
			comment: foundComment
		})
	} catch (err) {
		next(err)
	}
})
//// END OF SHOW GET ROUTE /// 

//// COMMENT EDIT GET ROUTE ////

router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundComment = await Comment.findByIdAndUpdate({_id: req.params.id});
		console.log('=============');
		console.log(`${foundComment}, <====== has been found in the COMMENT EDIT/UPDATE GET ROUTE`);
		console.log('=============');
		res.render('comments/edit.ejs', {
			comment: foundComment 
		});
	} catch (err) {
		next(err)
	}	
});
//// COMMENT EDIT GET ROUTE ////

//// CREATE/POST ROUTE ///// 
router.post('/tools/:id', async (req, res, next) => { console.log("\nreq.body in comment create route:", req.body);
	console.log();
	try {
		const createdComment = await Comment.create(req.body);
		///here we are trying to reference the tool object by ID and push a comment from the comment array///
		const foundTool = await Tool.findById(req.params.id)
		
		const placeForComment = await foundTool.comments
		
		
		placeForComment.push(createdComment)
		console.log("this is \nplaceForComment");
		console.log(placeForComment);


		await foundTool.save()

		// Tool.findById( req.params.id)/*.push(createdComment);*/


		res.redirect('/tools/' + req.params.id);
		// res.redirect('/comments')
	} catch (err) {
		next(err);
		// res.send(err);
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
});
///// END OF DELETE ROUTE /// 


//// export router

module.exports = router;