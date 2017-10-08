var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

// Reading a user from the DB
module.exports.getUser = function(req , res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "No user found!"}) ;
          return;
        }else{
          sendJsonResponse(res, 200, user);
        }
      })
  }else{
    sendJsonResponse(res, 404, {"message": "userid isn't found!"});
  }
};

// Add a new user to the DB
module.exports.createUser = function(req , res){
  User
    .create({
      user: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    },function(err, user){
      if(err){
        sendJsonResponse(res, 404, err);
      }else if (!user){
        sendJsonResponse(res, 404, {"message": "Couldn't create a new user!"});
      }else{
        sendJsonResponse(res, 201, user);
      }
    });
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
