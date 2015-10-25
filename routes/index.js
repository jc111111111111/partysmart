var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');
var sms = require('twilio')('AC5de47b0bf29da6a9b89a08f35d2c3877', '8a0c2fb532eaab6c58bda9665a2558a2');
var geobing = require('geobing');
 
geobing.setKey('AuOBx0ig6ttgyEVpoxLMgb9qfROJn2lzSaegxDJeBMXE9T1zoeEuBu5_87bZLG5v');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/admin', function(req, res, next) {
	db.getParties({}, -1, function(response) {
		res.render('admin', {parties: response});
	});
});

router.get('/party/register', function(req, res, next) {
	res.render('registerparty');
});

router.get('/party/complaint', function(req, res, next) {
	res.render('complain');
});

router.post('/party/add', function(req, res, next) {
	if(req.body.latitude)
		db.addParty(req.body, function() {});
	res.end();
});

router.post('/reversegeocode', function(req, res, next) {
	geobing.reverseGeocode(req.body.latitude, req.body.longitude, function (err, result) {
	    res.send(result); // raw response from service 
	});
});

router.post('/party/all', function(req, res, next) {
	db.getParties(req.body, -1, function(response) {
		res.send(response);
	});
});

router.post('/text', function(req, res, next) {
	db.addComplaint(req.body, function() {});
	db.getNumber(req.body.address, function(result) {
		sms.messages.create({
			body: req.body.note,
			to: result.number,
			from: "+1 413-650-1988"
		}, function(err, message) {
			console.log(err + " " + message.sid);
		});
	})
});

module.exports = router;
