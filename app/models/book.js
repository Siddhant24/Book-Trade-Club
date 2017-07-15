'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
   title: String,
   owner: { type: Schema.Types.ObjectId, ref: 'User' },
   cover: String,
   status: {
       code: { type: String, default: 'available' },
       name: { type: Schema.Types.ObjectId, ref: 'User', default: '596a1797fb4f860a72d9fede'}
   }
});

module.exports = mongoose.model('Book', Book);