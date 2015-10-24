var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
	title: String,
	credits: String,
	gened: String,
	sections: [{
		name: String,
		id: String,
		number: String,
		type: String,
		times: String,
		location: String,
		instructor: String,
		enrollment: {
			current: String,
			total: String
		}
	}]
});
/*
userSchema.methods.getClasses = function(filters, cb) {
	Course.find(
    cb(null, isMatch);
};*/
module.exports = mongoose.model('Course', courseSchema);
