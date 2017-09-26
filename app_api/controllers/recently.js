var mongoose = require( 'mongoose' );
var User = mongoose.model('Account');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

module.exports.recentlyViewedList = function(req, res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .select('recentlyViewed')
      .exec(function(err, songs){
        if (err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!songs){
          sendJsonResponse(res, 404, {"message": "No recently viewed songs are found!"});
          return;
        }else{
          sendJsonResponse(res, 200, songs);
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message": "userid isn't found!"});
  }
};

module.exports.createRecentlyViewed = function(req , res){

};

module.exports.updateRecentlyViewed = function(req , res){

};

module.exports.deleteRecentlyViewed = function(req , res){

};
