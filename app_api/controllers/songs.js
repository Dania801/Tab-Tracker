var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res , status , content){
  res.status(status);
  res.json(content);
};

// Read all songs stored in DB
module.exports.SongList = function(req , res){
  User
    .find()
    .select('allSongs')
    .exec(function(err, songs){
      if(err){
          sendJsonResponse(res, 404, err);
          return;
      }
      else if(!songs){
        sendJsonResponse(res, 404, {"message": "No songs found!"});
        return;
      }
      else
        sendJsonResponse(res, 200, songs);
    })
};

// Read all songs of a user from the DB
module.exports.getSong = function(req , res){
  User
    .find({'allSongs._id': req.params.songid},{'allSongs': true}, (err, song) => {
      for(var i = 0 ; i < song[0].allSongs.length; i++){
        var theSong ;
        if(song[0].allSongs[i]._id == req.params.songid){
          theSong = song[0].allSongs[i];
          break;
        }
      }
      sendJsonResponse(res, 200, theSong);
    });
};

// Add new song to the DB
module.exports.createSong = function(req , res){
  User
    .create(
      {"_id": "59d9e95b0172db900032f987"},
      {"$addToSet" : { "usersList" :  {
        username: "Vincent",
        password: "12345",
        email: "ssansnnom07@gmail.com"
      }}},
      done
    );
};

// Update a specific song in the DB
module.exports.updateSong = function(req , res){
  User
    .create(
      {"_id": req.params.songid},
      {"$addToSet" : { "usersList" :  {
        username: "Vincent",
        password: "12345",
        email: "ssansnnom07@gmail.com"
      }}},
      done
    );
};

// Remove a song from the DB
module.exports.deleteSong = function(req , res){
  if(req.params && req.params.songid){
    Song
      .findByIdAndRemove(req.params.songid)
      .exec(function(err, song){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!song){
          sendJsonResponse(res, 404, {"message": "No song is found!"});
          return;
        }else{
          sendJsonResponse(res, 204, null);
        }
      })
  }else{
    sendJsonResponse(res, 404, {"message":"No songid is found!"});
  }
};
