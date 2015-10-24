var db = require('monk')('mongodb://admin:admin@ds048878.mongolab.com:48878/partysmart');
var parties = db.get('parties');
var complaints = db.get('complaints');

/*
 Schema: 
 {
	date: Date,
	phone: String,
	email: String,
	address: String,
	coordinates: {latitude: Number, longitude: Number},
	complaints: [{
		date: Date,
		note: String
	}]
}
*/

module.exports = {
	addParty: function(party, cb) {
		parties.updateById(
			{ address: party.address }, 
			party, 
			{ upsert: true }, 
			function(err, doc) { }
		);
		cb();
	},
	getParties: function(coordinates, cb) {
		var partiesWithinRange = [];
		parties.find({}, { stream: true })
		.each(function(doc) {
			partiesWithinRange.push(doc);
		})
		.success(function() {
			cb(partiesWithinRange);
		});
	},
	addComplaint: function(complaint, cb) {
		complaints.updateById(
			{ address: complaint.address }, 
			complaint, 
			{ upsert: true }, 
			function(err, doc) { }
		);
		cb();
	}
};
