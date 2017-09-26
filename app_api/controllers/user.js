var mongoose = require( 'mongoose' );
var User = mongoose.model('Account');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

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

module.exports.createUser = function(req , res){

};

module.exports.updateUser = function(req , res){

};

module.exports.deleteUser = function(req , res){

};
