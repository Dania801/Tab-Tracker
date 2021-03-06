var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

module.exports.recentlyViewedList = function(req, res){
  if (req.params && req.params.userid){
    User
      .findOne({'allUsers._id': req.params.userid}, (err, user) => {
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else{
          for(var i = 0 ; i < user.allUsers.length; i++){
            var theList ;
            if (user.allUsers[i]._id == req.params.userid){
              theList = user.allUsers[i].recentlyViewed;
              break;
            }
          }
          sendJsonResponse(res, 200, theList);
        }
      });
  }else {
    sendJsonResponse(res, 404, {"message": "No userid is found!"});
  }
};

module.exports.createRecentlyViewed = function(req , res){
  if(req.params && req.params.userid){
    User
      .update({"allUsers._id": req.params.userid},{$push: { 'allUsers.$.recentlyViewed' : {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        lyrics: req.body.lyrics,
        tab: req.body.tab,
        cover: req.body.cover
      }}},(err, song) => {
        if (err){
          sendJsonResponse(res, 404, err);
          return;
        }else{
          sendJsonResponse(res, 201, song);
        }
      })
  }else{
    sendJsonResponse(res, 404, {"message": "No userid is found!"});
  }
};

module.exports.updateRecentlyViewed = function(req , res){

};

// Deleting a recently viewed song from a specific user list
module.exports.deleteRecentlyViewed = function(req , res){
  if(req.params && req.params.userid && req.params.recentlyid){
    User
      .findById(req.params.userid)
      .select('recentlyViewed')
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "No user is found!"});
          return;
        }else{
          user.recentlyViewed.id(req.params.recentlyid).remove();
          user.save(function(err){
            if(err){
              sendJsonResponse(res, 404, err);
            }else{
              sendJsonResponse(res, 204, null);
            }
          })
        }
      })
  }else{
    if(!req.params.userid)
      sendJsonResponse(res, 404, {"message": "no userid is found!"});
    else
      sendJsonResponse(res, 404 , {"message": "no recentlyid is found"});
  }
};
