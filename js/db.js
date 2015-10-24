var db = require('monk')('mongodb://admin:admin@ds048878.mongolab.com:48878/partysmart');
var parties = db.get('parties');

module.exports = {
	update: function(party, cb) {
		parties.updateById({id: party.title}, party, {upsert: true}, function(err, doc) { });
	},
	find: function(cb) {
		parties.find({}, {}, cb);
	}
};
