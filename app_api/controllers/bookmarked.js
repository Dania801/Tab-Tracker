var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

// Reading the bookmarked songs to a specific user.
module.exports.bookmarkList = function(req , res){
  if(req.params && req.params.userid){
    User
      .findOne({'allUsers._id': req.params.userid}, (err, user) => {
        for(var i = 0 ; i < user.allUsers.length; i++){
          var theBookmark ;
          if (user.allUsers[i]._id == req.params.userid){
            theBookmark = user.allUsers[i].bookmarkedSongs;
            break;
          }
        }
        sendJsonResponse(res, 200, theBookmark);
      });
  }else{
    sendJsonResponse(res, 404, {"message": "No userid is found!"});
  }
};

// Adding new Bookmarked song to a specific user
module.exports.createBookmark = function(req , res){
  if(req.params && req.params.userid){
    User
      .update({"allUsers._id": req.params.userid},{$push: { 'allUsers.$.bookmarkedSongs' : {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        lyrics: req.body.lyrics,
        tab: req.body.tab,
        cover: req.body.cover
      }}},(err, song) => {
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else{
          sendJsonResponse(res, 201, song);
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message": "No userid is found"});
  }
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
