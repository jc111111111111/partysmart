var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../js/db.js');
var sms = require('twilio')('AC5de47b0bf29da6a9b89a08f35d2c3877', '8a0c2fb532eaab6c58bda9665a2558a2'); 

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/party/register', function(req, res, next) {
	res.render('registerparty');
});

router.get('/party/complaint', function(req, res, next) {
	res.render('complain');
});

router.post('/party/add', function(req, res, next) {
	db.addParty(req.body, function() {});
	res.end();
});

router.post('/party/all', function(req, res, next) {
	if(req.body.latitude) {
		db.getParties(req.body, 10, function(response) {
			console.log(JSON.stringify(response));
			res.render('complain', {parties: response});
		});
	}
	else {
		db.getParties(req.body, -1, function(response) {
			console.log(JSON.stringify(response));
			res.render('complain', {parties: response});
		});
	}
});

router.post('/complain', function(req, res, next) {
	sms.messages.create({     
		body: "testing",//req.body.complaint.note,
		to: "5372758",
		from: "+1 413-650-1988" 
	}, function(err, message) { 
		n
		console.log(err + " " + message.sid); 
	});
});
module.exports = router;
