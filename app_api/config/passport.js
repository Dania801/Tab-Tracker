var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto') ;
require('../models/accounts');


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    var theUser;
    var theSalt;
    var theHash;
    console.log('HELLO!!!!!!!!');
    console.log(email);
    console.log(password);

    User
      .findOne({'allUsers.email': req.body.email}, (err, user) => {
        if(err){
          return;
        }else if(!user){
          return;
        }else{
          for(var i = 0 ; i < user.allUsers.length; i++){
            var theUser ;
            if (user.allUsers[i].email == req.body.email){
              theUser = user.allUsers[i];
              theSalt = user.allUsers[i].salt;
              theHash = user.allUsers[i].hash;
              var hash = crypto.pbkdf2Sync(req.body.password, theSalt, 1000, 64, 'sha1').toString('hex');
              break;
            }
          }
          console.log(theUser);
          if(err){

          }else if(!theUser){
            console.log('first');
            return done(null, false, {message: 'User not found'});
          }else if(hash !== theHash){
            console.log('second');
            return done(null, false, { message: 'Password is wrong'});
          }else{
            console.log('third');
						 return done(null, theUser);
          }
        }
      });
  }));


	  passport.serializeUser(function(user, done) {
	    done(null, user._id);
	  });

	  passport.deserializeUser(function(id, done) {
			User
				.findOne({'allUsers._id': req.params.userid}, (err, user) => {
						for(var i = 0 ; i < user.allUsers.length; i++){
							var theUser ;
							if (user.allUsers[i]._id == req.params.userid){
								theUser = user.allUsers[i];
								break;
							}
						}
						done(err, theUser);
				});
	  });




		  passport.use('local-signup', new LocalStrategy({
		    usernameField: 'email',
		    passwordField: 'password',
		    passReqToCallback: true,
		  },
		  function(req, email, password, done) {
		    process.nextTick(function() {
		      User.findOne({ 'email':  email }, function(err, user) {
		        if (err)
		            return done(err);
		        if (user) {
		          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
		        } else {
		          var newUser = new User();
		          newUser.local.email = email;
		          newUser.local.password = newUser.generateHash(password);
		          newUser.save(function(err) {
		            if (err)
		              throw err;
		            return done(null, newUser);
		          });
		        }
		      });
		    });
		  }));
