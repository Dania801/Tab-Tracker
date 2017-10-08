var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

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
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .select('recentlyViewed')
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "No user found!"});
          return;
        }else{
          addRecentlyViewedSong(req, res, user);
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message":"userid isn't found!"});
  }
};

var addRecentlyViewedSong = function(req, res, user){
  user.recentlyViewed.push({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    youtubeID: req.body.youtubeID,
    lyrics: req.body.lyrics,
    tab: req.body.tab,
    cover: req.body.cover
  });

  user.save(function(err, user){
    var thisRecently;
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    }else{
      thisRecently = user.recentlyViewed[user.recentlyViewed.length -1];
      sendJsonResponse(res, 201, thisRecently);
    }
  });
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
