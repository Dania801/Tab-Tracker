var mongoose = require( 'mongoose' );
var passport = require('passport');
var User = mongoose.model('User');
var Client = mongoose.model('Client');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

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
module.exports.getUserProfile = function(req , res){
  if (!req.payload._id) {
    sendJsonResponse(401, {"message": "UnauthorizedError: private profile"})
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        sendJsonResponse(res, 200, user) ;
      });
  }
};

module.exports.loginUser = function(req, res){
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
  })(req, res);
};

// Add a new user to the DB
module.exports.registerUser = function(req , res){
  console.log('Im inside registrerUser function')
  var user = new Client();

  // take data from the form and create new mongoose instance
  user.username = req.body.username;
  user.email = req.body.email;
  // generate the hashed password
  user.setPassword(req.body.password);
  console.log(user);

  User
  .update({_id: '59fca9420c658a45983092f1'}, {$push : {allUsers: user}}, {upsert: true} , (err, user) => {
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    } else {
      var token;
      // generate jwt
      token = user.generateJwt();
      // send the jwt inside the response
      sendJsonResponse(res, 201, {"token": token}) ;
    }
  })
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
