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

function getDistance(lat1, lon1, lat2, lon2) {

	var R = 6371000; // meters
	var φ1 = lat1;
	var φ2 = lat2;
	var Δφ = (lat2-lat1);
	var Δλ = (lon2-lon1);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d;
}

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
	getParties: function(coordinates, range, cb) {
		var partiesWithinRange = [];

		parties.find({}, { stream: true })
		.each(function(doc) {
			if(getDistance(
				coordinates.latitude, 
				coordinates.longitude, 
				doc.coordinates.latitude, 
				doc.coordinates.longitude)/1609.34 < range)
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
