var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');
var sms = require('twilio')('AC5de47b0bf29da6a9b89a08f35d2c3877', '8a0c2fb532eaab6c58bda9665a2558a2');
var geobing = require('geobing');
var moment = require('moment');

geobing.setKey('AuOBx0ig6ttgyEVpoxLMgb9qfROJn2lzSaegxDJeBMXE9T1zoeEuBu5_87bZLG5v');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/admin/', function(req, res, next) {
	db.getParties({}, -1, function(parties) {
		db.getComplaints(function(complaints) {
			res.render('admin', {parties: parties, complaints: complaints});
		});
	});
});

router.get('/party/register', function(req, res, next) {
	res.render('registerparty');
});

router.get('/party/complaint', function(req, res, next) {
	res.render('complain');
});

router.post('/party/add', function(req, res, next) {
		db.addParty(req.body, function() {});
		sms.messages.create({
			body: "Your party at " + req.body.address + " has been registered. You will be notified of any complaints through this number. Have fun!",
			to: req.body.phone,
			from: "+1 413-650-1988"
		}, function(err, message) {});
		res.end();
});

router.post('/reversegeocode', function(req, res, next) {
	geobing.reverseGeocode(req.body.latitude, req.body.longitude, function (err, result) {
	    res.send(result); // raw response from service
	});
});

router.post('/party/all', function(req, res, next) {
	db.getParties(req.body, 18, function(response) {
		res.send(response);
	});
});

router.post('/text', function(req, res, next) {
	var complaint = req.body;
	complaint.time = new Date().toLocaleString();
	db.addComplaint(complaint, function() {});
	db.getNumber(req.body.address, function(result) {
		res.end();
		sms.messages.create({
			body: req.body.note || "You have received a warning about your party. Please quiet down or disperse.",
			to: result.phone,
			from: "+1 413-650-1988"
		}, function(err, message) {});
	})
});

module.exports = router;
