var mongoose = require('mongoose');

var partySchema = new mongoose.Schema({
	date: Date,
	phone: String,
	email: String,
	address: String,
	coordinates: {latitude: Number, longitude: Number},
	complaints: [{
		date: Date,
		note: String
	]}
});

module.exports = mongoose.model('Party', partySchema);
