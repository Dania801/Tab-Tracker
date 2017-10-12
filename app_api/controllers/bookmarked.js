var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

// Reading the bookmarked songs to a specific user.
module.exports.bookmarkList = function(req , res){
  User
    .findOne({'allUsers._id': req.params.userid}, (err, user) => {
      for(var i = 0 ; i < user.allUsers.length; i++){
        var theUser ;
        if (user.allUsers[i]._id == req.params.userid){
          theUser = user.allUsers[i].bookmarkedSongs;
          break;
        }
      }
      sendJsonResponse(res, 200, theUser);
    });
};

// Adding new Bookmarked song to a specific user
module.exports.createBookmark = function(req , res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .select('bookmarkedSongs')
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if (!user){
          sendJsonResponse(res, 404, {"message": "No user found!"});
          return;
        }else{
          addNewBookmark(req, res, user);
        }
      })
  }else{
    sendJsonResponse(res, 404, {"message": "userid isn't fount!"});
  }
};

var addNewBookmark = function(req, res, user){
  user.bookmarkedSongs.push({
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
    var thisBookmark;
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    }else{
      thisBookmark = user.bookmarkedSongs[user.bookmarkedSongs.length -1];
      sendJsonResponse(res, 201, thisBookmark);
    }
  });
};

module.exports.updateBookmark = function(req , res){

};

module.exports.deleteBookmark = function(req , res){
  if(req.params && req.params.userid && req.params.bookmarkid){
    User
      .findById(req.params.userid)
      .select('bookmarkedSongs')
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "No user is found!"});
          return;
        }else{
          user.bookmarkedSongs.id(req.params.bookmarkid).remove();
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
      sendJsonResponse(res, 404 , {"message": "no bookmarkid is found"});
  }
};
