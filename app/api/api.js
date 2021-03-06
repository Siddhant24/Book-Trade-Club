'use strict';

var Book = require('../models/book.js');
var User = require('../models/users.js');
var google = require('googleapis');
var books = google.books('v1');

module.exports = {
    
    addBook: function(search, user_id){
        books.volumes.list({
            auth: process.env.API_KEY,
            q: search,
            maxResults: 1
        }, function(err, data){
            if(err) console.error(err);
            var newBook = new Book();
            newBook.title = data.items[0].volumeInfo.title;
            newBook.owner = user_id;
            newBook.cover = data.items[0].volumeInfo.imageLinks === undefined ? '' : data.items[0].volumeInfo.imageLinks.thumbnail,
            newBook.save(function (err) {
				if (err) {
					throw err;
					}
			    });
            }
        );
    },
    
    allBooks: function(){
       return new Promise(function(resolve, reject){
           Book.find(function(err, docs){
               if(err) console.error(err);
               resolve(docs);
           }); 
       });
    },
    
    myBooks: function(user_id){
        return new Promise(function(resolve, reject){
            Book.find({owner: user_id}, function(err, docs){
                if(err) console.error(err);
                resolve(docs);
            });
        });
    },
    
    deleteBook: function(book_id){
        Book.findOneAndRemove({_id: book_id}, function(err, doc){
            if(err) console.error(err);
        });
    },
    
    addRequest: function(book_id, requester_id){
        var newStatus = {code: 'requested', name: requester_id};
        Book.findOneAndUpdate({_id: book_id}, { $set: {status: newStatus}}, {new: true}, function(err, doc){
            if(err) console.error(err);
        });
    },
    
    myRequests: function(user_id){
        return new Promise(function(resolve, reject){
           Book.find({"status.code": "requested",
               "status.name": user_id
           }, function(err, docs){
               if(err) console.error(err);
               resolve(docs); 
           }); 
        });
    },
    
    cancelRequest: function(book_id){
        var newStatus = {code: 'available', name: '596a1797fb4f860a72d9fede'};
        Book.findOneAndUpdate({_id: book_id}, {$set: {status: newStatus}}, {new: true}, function(err, doc){
            if(err) console.error(err);
        });
    },
    
    approveRequest: function(book_id){
        Book.findOneAndUpdate({_id: book_id}, {"status.code": "traded"}, {new: true}, function(err, doc){
            if(err) console.error(err);
        });
    },
    
    updateProfile: function(data, user_id){
        User.findOneAndUpdate({_id: user_id}, {city: data.city, state: data.state}, {new: true}, function(err, doc){
            if(err) console.error(err);
        });
    }
    
};