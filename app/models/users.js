'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String
	},
	
	city: { 
		type: String,
		default: ''
	},
	state: { 
		type: String,
		default: ''
	},
});

module.exports = mongoose.model('User', User);
