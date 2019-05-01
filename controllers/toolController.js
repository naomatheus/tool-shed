const express 			= require('express');
const mongoose 			= require('mongoose');
const router 			= express.Router();
// const pathfinderUI 		= require('pathfinder-ui');
const multer 			= require('multer');
const upload 			= multer({dest: './uploads'});
const fs 				= require('fs');
const session 			= require('express-session');	
/// node modules

/// require tools model ///

const Tool 		= require('../models/tool.js');
const User 		= require('../models/user.js');
const Comment 	= require('../models/comment.js');

/// require tools model ///

/// tools new route ///
router.get('/new', (req, res) => {
	// if user is not logged in, this route redirects to the login page
	if (req.session.logged !== true){
		res.redirect('/auth/login') 
	} else if (req.session.logged === false) {
		res.redirect('/auth/login')
	} else {
		res.render('tools/new.ejs')	
	}
})
/// tools new route ///

//// tools index route /// 
router.get('/', async (req, res, next) => {

		try {

			const foundTools = await Tool.find({})
			.populate('owner'/*{path:'owner', select:'userName'+'-_id'}*/)
			.exec();
			// tool should be displayed with it's image in the tools index
			console.log('====================');
			console.log(`${foundTools} <===== has been found in the TOOL INDEX GET ROUTE`);
			console.log('====================');
			res.render('tools/index.ejs', {
				tools: foundTools
			})

		} catch (err){
			next(err)
		}
})	
//// tools index route /// 


//// tool index display gotten image route ///

router.get('/tools/:id', async (req, res, next) => {
	try {
		/// HERE WE MAY WANT TO HAVE A PAGE RENDERED THAT JUST DISPLAYS THE IMAGES SO THAT WE CAN REFERENCE
		/// THEM IN ANOTHER ROUTE
		const displayedToolImage = Tool.findById(req.params.id.toolImage)
		console.log(displayedToolImage, "this image should be displayed ");
		// res.render('toolImage', {
		// 	displayedToolImage : req.params.id.toolImage
		// })
	} 
	catch (err) {
		next(err)
	}
});



//// tool index display gotten image route ///

/// tool image serving route /// /// this route is also picking up the foundTool with UserID and may pick up comments as well 
router.get('/:id/picture', async (req, res, next) => {
		try {
			const foundTool = await Tool.findById(req.params.id);
			console.log("\n\nhere's foundTool");
			console.log(foundTool);	
			// console.log( "<<<--- these tools should have their images displayed");
			res.set('Content-Type', foundTool.toolImage.contentType)
			res.send(foundTool.toolImage.data)
		}
		catch(err) {
			next(err)
		}
})
/// tool index image get route ///


//// tools show route///
router.get('/:id', async (req, res) => {
	try{
		const foundTool = await Tool.findById({_id: req.params.id})
		.populate('comments')
		.populate('owner')
		.exec()
		// ;
		// console.log('=====================');
		// console.log(`${foundTool} <======= tool has hit the TOOL SHOW GET ROUTE!!`);
		// console.log('=====================');
		res.render('tools/show.ejs', {
			tool: foundTool,
		});

	} catch (err){
		res.send(err);
	}
});

/// TOOLS SHOW ROUTE ///



/// START OF EDIT GET ROUTE ///
router.get('/:id/edit', async (req, res, next) => {
	try {
		if (req.session.usersDbId !== res.locals.userId){
			res.redirect('/')
		} else {
		const foundTool = await Tool.findByIdAndUpdate({_id: req.params.id});
		console.log('=====================');
		console.log(`${foundTool} <====== tool has hit the TOOL EDIT/UPDATE GET ROUTE!!!`);
		console.log('=====================');
		let userIsUser = false;
		if (res.locals.userId === foundTool.owner._id.toString()){
			userIsUser = true;
			}
			res.render('tools/edit.ejs', {
				tool: foundTool,
				canEdit: userIsUser
			});
		}
	}catch(err){
		next(err)
	}
});
/// END OF EDIT GET ROUTE ///

/// START OF CREATE/POST ROUTE ///
router.post('/', upload.single('imageData'), async (req, res, next) => { 
	try{


		//// maybe flip this so that the Tool.create() is created at the bottom of this block, so that properties are assigned first before the tool is created as a doc 

		const createdTool = await Tool.create(req.body);
		console.log('=====================');
		console.log(`tool has been created in the TOOL CREATE POST ROUTE!!! here it is`);
		console.log(createdTool);
		console.log('__________________');
		console.log('this is createdTool.owner', createdTool.owner);
		console.log('=====================');

		const img = {}
		img.imageTitle = req.body.imageTitle;
		img.imageDescription = req.body.imageDescription;
		img.contentType = req.file.mimetype
		// filepath leads to /uploads according to multer set up SET AS './uploads/' because toolController is nested once 
		const filePath = './' + req.file.path
		img.data = fs.readFileSync(filePath);

		createdTool.toolImage = img
		console.log('THIS IS THE USER ID FOR THIS SESSION___________________');
		console.log(req.session.usersDbId);
		console.log('THIS IS THE USER ID FOR THIS SESSION___________________');
		const foundUser = await User.findOne({_id:req.session.usersDbId})
		console.log('THIS IS FOUND USER BY THE QUERY');

		console.log(foundUser);
		console.log('THIS IS FOUND USER BY THE QUERY');
		/// it doesn't like this owner business
		createdTool.owner = foundUser;	
		await createdTool.save();

		console.log(createdTool);

		// / saves everything to DB
		res.redirect('/tools');

	} catch (err){
		next(err) 
		console.log(`<====== THERE HAS BEEN AN ERROR!!!`);
	}
});
/// START OF CREATE/POST ROUTE ///


/// START OF EDIT PUT ROUTE ///
router.put('/:id', upload.single('imageData'), async (req, res, next) => {
	console.log("\nreq.file");
	console.log(req.file);
	if (!req.file){
		res.send('Sorry, you must upload an image when updating. Press BACK and try again.')
	}
	try{
		console.log(req.session.username);
		
		const tool = await Tool.findById(req.params.id)

		const filePath = './' + req.file.path
		tool.toolImage.data = fs.readFileSync(filePath);
		tool.toolImage.contentType = req.file.mimetype
		tool.toolImage.imageTitle = req.body.imageTitle
		tool.toolImage.imageDescrption = req.body.imageDescription

		await tool.save();
		res.redirect('/tools/' + req.params.id);

	}catch(err) {
		next(err)
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






