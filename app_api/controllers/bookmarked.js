var mongoose = require( 'mongoose' );
var User = mongoose.model('Account');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

module.exports.bookmarkList = function(req , res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .select('bookmarkedSongs')
      .exec(function(err, songs){
        if (err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!songs){
          sendJsonResponse(res, 404, {"message": "No bookmarked songs are found!"});
          return;
        }else{
          sendJsonResponse(res, 200, songs);
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message": "userid isn't found!"});
  }
};

module.exports.createBookmark = function(req , res){

};

module.exports.updateBookmark = function(req , res){

};

module.exports.deleteBookmark = function(req , res){

};
