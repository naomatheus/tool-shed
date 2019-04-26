const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
// const pathfinderUI 		= require('pathfinder-ui');
const multer 			= require('multer');
const upload 			= multer({dest: './uploads'});
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
router.post('/', upload.single('imageData'), async (req, res, next) => { 
	console.log("HEY HI TOOLS POST HELLO")
	console.log("\nhere is req.body:");
	console.log(req.body);
	try{
		const createdTool = await Tool.create(req.body);
		console.log('=====================');
		console.log(`tool has been created in the TOOL CREATE POST ROUTE!!! here it is`);
		console.log(createdTool);
		console.log('=====================');

		console.log('====this is req.file=================');
		console.log(req.file);
		// console.log(`${req.file} <===== t`);
		// console.log('=====================');

		const img = {}
		img.imageTitle = req.body.imageTitle;
		img.imageDescription = req.body.imageDescription;
		img.contentType = req.file.mimetype
		// filepath leads to /uploads according to multer set up SET AS './uploads/' because toolController is nested once 
		const filePath = './' + req.file.path
		img.data = fs.readFileSync(filePath);

		createdTool.toolImage = img

		await createdTool.save();

		// / saves everything to DB
		res.redirect('/tools');

	} catch (err){
		next(err) 
		console.log(`<====== THERE HAS BEEN AN ERROR!!!`);
	}
});
/// START OF CREATE/POST ROUTE ///

/// TOOL IMAGE ROUTE ///
// router.post('/', upload.single('imageData'), async (req, res, next) => {
			
// 		})

/// TOOL IMAGE ROUTE ///

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






