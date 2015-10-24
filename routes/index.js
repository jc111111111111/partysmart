var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');

router.get('/', function(req, res, next) {
	res.render('index');
});
router.post('/party', function(req, res, next) {
	console.log(JSON.stringify(req.body.item));
	res.end();
//	db.add(req.body.data, function() {});
});
router.put('/complaint', function(req, res, next) {
	
});

module.exports = router;
