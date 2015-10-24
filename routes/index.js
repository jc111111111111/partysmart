var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/party', function(req, res, next) {
	db.addParty(req.body.party, function() {});
	res.end();
});

router.post('/parties', function(req, res, next) {
	db.getParties(req.body.coordinates, .25 , function(response) {
		res.send(response);
	});
});

router.post('/complaint', function(req, res, next) {
	db.addComplaint(req.body.complaint, function() {});
	console.log("Complaint registered");
	res.end();
});

router.get('/map',function(req, res, next) {
	res.render('map');
});

module.exports = router;
