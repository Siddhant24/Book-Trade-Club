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
				console.log(newBook);
			    });
            }
        );
    },
    
    allBooks: function(){
       return new Promise(function(resolve, reject){
           Book.find(function(err, docs){
               if(err) console.error(err);
    //           console.log(docs);
               resolve(docs);
           }); 
       });
    },
    
    myBooks: function(user_id){
        return new Promise(function(resolve, reject){
            Book.find({owner: user_id}, function(err, docs){
                if(err) console.error(err);
                return docs;
            });
        });
    },
    
    deleteBook: function(book_id){
        Book.findOneAndRemove({_id: book_id}, function(err, doc){
            if(err) console.error(err);
            console.log(doc);
        });
    },
    
    addRequest: function(book_id, requester_id){
        //console.log(book_id);
        //console.log(requester_id);
        var newStatus = {code: 'requested', name: requester_id};
        Book.findOneAndUpdate({_id: book_id}, { $set: {status: newStatus}}, {new: true}, function(err, doc){
            if(err) console.error(err);
            console.log(doc);
        });
    },
    
    myRequests: function(user_id){
        return new Promise(function(resolve, reject){
           Book.find({status: {code: 'requested', name: user_id}}, function(docs){
              resolve(docs); 
           }); 
        });
    },
    
};