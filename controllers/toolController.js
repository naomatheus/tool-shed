const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
const methodOverride 	= require('method-override');
const bodyParser 		= require('body-parser');
const ejs 				= require('ejs');
const pathfinderUI 		= require('pathfinder-ui');
const multer 			= require('multer');
const upload 			= multer({dest: './uploads/'});
const fs 				= require('fs');	
/// node modules

/// require tools model ///
const Tool = require('../models/tool.js');
/// require tools model ///

/// tools new route ///
router.get('/new', (req, res) => {
	res.render('tools/new.ejs')
})
/// tools new route ///

//// tools index route /// 
router.get('/', async (req, res) => {
	try {

		const foundTools = await Tool.find({});
		console.log('====================');
		console.log(`${foundTools} <===== has been found in the TOOL INDEX GET ROUTE`);
		console.log('====================');
		res.render('tools/index.ejs', {
			tools: foundTools
		})

	} catch (err){
		res.send(err)
	}
})	
//// tools index route /// 

//// tools show route///
router.get('/:id', async (req, res) => {
	try{
		const foundTool = await Tool.findById({_id: req.params.id});
		console.log('=====================');
		console.log(`${foundTool} <======= tool has hit the TOOL SHOW GET ROUTE!!`);
		console.log('=====================');
		res.render('tools/show.ejs', {
			tool: foundTool
		});

	} catch (err){
		res.send(err);
	}
});

/// TOOLS SHOW ROUTE ///



/// START OF EDIT GET ROUTE ///
router.get('/:id/edit', async (req, res) => {
	try{

		const foundTool = await Tool.findByIdAndUpdate({_id: req.params.id});
		console.log('=====================');
		console.log(`${foundTool} <====== tool has hit the TOOL EDIT/UPDATE GET ROUTE!!!`);
		console.log('=====================');
		res.render('tools/edit.ejs', {
			tool: foundTool
		});
	}catch(err){
		res.send(err);
	}
})
/// END OF EDIT GET ROUTE ///

/// START OF CREATE/POST ROUTE ///
router.post('/', async (req, res, next) => { console.log("HEY HI TOOLS POST HELLO")
	try{
		const createdTool = await Tool.create(req.body);
		console.log('=====================');
		console.log(`${createdTool} <===== tool has been created in the TOOL CREATE POST ROUTE!!!`);
		console.log('=====================');

		console.log('=====================');
		console.log(`${req.file} <===== this is req.file`);
		console.log('=====================');

		const filePath = './' +req.file.path

		createdTool.toolImage.imageTitle = req.body.toolImage.imageTitle;

		createdTool.toolImage.data = req.body.toolImage.data;
		createdTool.toolImage.data = fs.readFileSync(filePath);
		// filepath leads to /uploads according to multer set up SET AS './uploads/' because toolController is nested once 

		createdTool.toolImage.imageDescription = req.body.toolImage.imageDescription;

		await createdTool.save();
		/// saves everything to DB

		res.redirect('/tools');

	} catch (err){
		next(`${err} <====== THERE HAS BEEN AN ERROR!!!`)
	}
});
/// START OF CREATE/POST ROUTE ///

/// START OF EDIT PUT ROUTE ///
router.put('/:id', async (req, res) => {
	try{

		const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log('=====================');
		console.log(`${updatedTool} <========== this tool hit the TOOL EDIT PUT ROUTE`);
		console.log('=====================');
		res.redirect('/tools/' + req.params.id);

	}catch(err) {
		res.send(err)
	}
});
/// END OF EDIT PUT ROUTE ///



/// TOOLS DELETE ROUTE ///
router.delete('/:id', async (req, res) => {
	
	try {
		const deletedTool = await Tool.findByIdAndRemove(req.params.id);
		console.log(`${deletedTool} <--- THIS TOOL HAS BEEN DELETED!!!`);
		res.redirect('/tools');
	} catch (err) {
		res.send(err)
	}

});
/// TOOLS DELETE ROUTE ///

module.exports = router;






