const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const pathfinderUI = require('pathfinder-ui');
/// node modules

/// require tools model ///
const Tools = require('../models/tools.js');
/// require tools model ///

/// tools new route ///
router.get('/new', (req, res) => {
	res.render('new.ejs')
})
/// tools new route ///

//// tools index route /// 

router.get('/', async (req, res) => {
	try {

		const foundTools = await Tools.find({});
		res.render('index.ejs', {
			tools: foundTools
		})

	} catch (err){
		res.send(err)
	}
})	

//// tools index route /// 

module.exports = router;


