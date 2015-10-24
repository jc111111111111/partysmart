var db = require('monk')('localhost:27017/courses');
var courses = db.get('courses');

module.exports = {
	update: function(course, cb) {
		courses.updateById({id: course.title}, course, {upsert: true}, function(err, doc) { });
	},
	find: function(cb) {
		courses.find({}, {}, cb);
	}
};
