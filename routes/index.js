var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');
var sms = require('twilio')('AC5de47b0bf29da6a9b89a08f35d2c3877', '8a0c2fb532eaab6c58bda9665a2558a2'); 

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/registerparty', function(req, res, next) {
	res.render('registerparty');
});

router.get('/filecomplaint', function(req, res, next) {
	res.render('complain');
});

router.post('/party', function(req, res, next) {
	db.addParty(req.body, function() {});
	res.end();
});

router.post('/parties', function(req, res, next) {
	db.getParties({latitude: 42.393402, longitude: -72.525283}, .25 , function(response) {
		res.render('complain', {parties: response});
	});
});

router.post('/complain', function(req, res, next) {
	sms.messages.create({     
		body: req.body.complaint.note,
		to: "+1 413-537-2758",
		from: "+1 413-650-1988" 
	}, function(err, message) { 
		console.log(message.sid); 
	});
});
module.exports = router;
