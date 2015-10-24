var db = require('monk')('mongodb://admin:admin@ds048878.mongolab.com:48878/partysmart');
var parties = db.get('parties');

module.exports = {
	add: function(party, cb) {
		parties.add(party);
		cb();
	}
};
