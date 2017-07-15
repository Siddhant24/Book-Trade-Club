'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
   title: String,
   owner: { type: Schema.Types.ObjectId, ref: 'User' },
   cover: String,
   status: {
       code: { type: String, default: '' },
       name: { type: Schema.Types.ObjectId, ref: 'User', default: 0}
   }
});

module.exports = mongoose.model('Book', Book);