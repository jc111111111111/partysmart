var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/test', function(req, res, next) {
	res.render('index1');
});

router.get('/registerparty', function(req, res, next) {
	res.render('registerparty');
});

router.get('/filecomplaint', function(req, res, next) {
	res.render('complain');
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
module.exports = router;
