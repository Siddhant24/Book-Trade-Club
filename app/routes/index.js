'use strict';

var path = process.cwd();
var api = require('../api/api.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/all')
		.get(isLoggedIn, function(req, res){
			res.sendFile(path + '/public/allBooks.html');
		});
		
	app.route('/my')
		.get(isLoggedIn, function(req, res){
			res.sendFile(path + '/public/myBooks.html');
		})
		.post(isLoggedIn, function(req, res){
//			console.log('body...' + req.body.title);
//			console.log('user...' + req.user);
			api.addBook(req.body.title, req.user._id);
			res.redirect('/my');
		});
		
	app.route('/allBooks')
		.get(isLoggedIn, function(req, res){
			api.allBooks().then(function(docs){
				console.log(docs);
				res.send(docs);
			});
		});
		
	app.route('/myBooks')
		.get(isLoggedIn, function(req, res){
			console.log('my books requested...');
			var myData = {};
			api.myBooks(req.user._id).then(function(docs){
				console.log('my books received...');
				myData.books = docs;
				api.myRequests(req.user._id).then(function(requests){
					console.log('my requests recevied...');
					myData.myRequests = requests;
				//	console.log(myData);
					res.send(myData);
				});	
			});
		})
		.post(isLoggedIn, function(req, res){
			api.deleteBook(req.body.book_id);
			res.send("deleted...");
		});
		
	app.route('/trade')
		.get(isLoggedIn, function(req, res){
			console.log(req.query);
			api.addRequest(req.query.id, req.user._id);
			res.send("successfully requested");
		})
		.post(isLoggedIn, function(req, res){
			api.cancelRequest(req.body.book_id);
			res.send("cancelled request...");
		});
		
	app.route('/request')
		.post(isLoggedIn, function(req, res){
			api.approveRequest(req.body.book_id);
			res.send("approved request...");
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		})
		.post(isLoggedIn, function (req, res) {
			console.log(req.body);
			api.updateProfile(req.body, req.user._id);
			res.redirect('/profile');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

};
