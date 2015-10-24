var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');

router.get('/', function(req, res, next) {
	res.render('index');
});
router.get('/parties', function(req, res, next) {
	db.find(function(err, data) {
		if(err)
			console.log(err);
		else
			res.json(data);
	});
});
router.get('/map',function(req, res, next) {
	res.render('map');
});
module.exports = router;
