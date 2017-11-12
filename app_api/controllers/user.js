var mongoose = require( 'mongoose' );
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var Client = mongoose.model('Client');
var jwt = require('jsonwebtoken');


var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

// generate jwt for every live session of users
var generateJwt = function() {
  console.log('inside jwt function!');
	 var expiry = new Date();
	 expiry.setDate(expiry.getDate() + 7);

	  return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};



module.exports.getAll = function(req, res){
  console.log('getAll is called!!');
  User.find({},(err, all) => {
    if(err){
      sendJsonResponse(res, 404, err);
    }else{
      sendJsonResponse(res, 200, all);
    }
  });
}

// Reading a user from the DB
module.exports.getUserProfile = function(req, res, next){

  console.log('Im inside getUserProfile function !!');
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      console.log('Error1');
      return next(err);
    }

    if (!user) {
      console.log('Error2');
      return res.redirect('/signin');
    }
    console.log(user);
    console.log('success!');
    req.logIn(user, function(err) {
      console.log('Inside the last fuckin function!');
      if (err) {
        console.log('Error3');
        return next(err);
      }
      console.log('Here im!');
      res.status(201);
      res.json(user);
      return res.redirect('/' );
    });
  })(req, res, next);
};

module.exports.loginUser = function(req, res){/*
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      sendJsonResponse(res, 200, {"token": token}) ;
    } else {
      // If user is not found
      sendJsonResponse(res, 401, info);
    }
  })(req, res);*/

};


// Add a new user to the DB
module.exports.registerUser = function(req , res){
  console.log('Im inside registrerUser function')
  var user = new Client();
  var token ;

  // take data from the form and create new mongoose instance
  user.username = req.body.username;
  user.email = req.body.email;
  // generate the hashed password
  user.setPassword(req.body.password);
  console.log(user);

  User
  .update({_id: '5a032a31e788c449f37b24e8'}, {$push : {allUsers: user}}, {upsert: true} , (err, user) => {
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    } else {
      token = generateJwt();
      console.log(user);
    }
  })

  console.log(user);
  console.log(req.body.email);

  User.find({},(err, all) => {
    if(err){
      sendJsonResponse(res, 404, err);
    }else{
      sendJsonResponse(res, 200, all);
    }
  });

  /*User
    .find({'allUsers.email': req.body.email},{'allUsers': true}, (err, user) => {
      if (err){
        sendJsonResponse(res, 404, err);
        return;
      }else {
        for(var i = 0 ; i < user[0].allUsers.length; i++){
          var theUser ;
          if(user[0].allUsers[i].email == req.body.email){
            theUser = user[0].allUsers[i];
            break;
          }
        }
        sendJsonResponse(res, 200, theUser);
      }
    });*/

};

module.exports.updateUser = function(req , res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "Couldn't find the user!"});
          return;
        }else{
          user.user.username = req.body.username ? req.body.username : user.user.username;
          user.user.password = req.body.password ? req.body.password : user.user.password;
          user.user.email = req.body.email ? req.body.email : user.user.email;
          user.save(function(err, user){
            if(err){
              sendJsonResponse(res, 404, err);
            }else{
              sendJsonResponse(res, 200, user);
            }
          });
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message":"No userid found!"});
  }
};

module.exports.deleteUser = function(req , res){

};
