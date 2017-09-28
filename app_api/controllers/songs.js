var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Account = mongoose.model('Account');

var sendJsonResponse = function(res , status , content){
  res.status(status);
  res.json(content);
};

// Read all songs stored in DB
module.exports.SongList = function(req , res){
  Song
    .find()
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

// Read a song from the DB
module.exports.getSong = function(req , res){
  if (req.params && req.params.songid){
    Song
      .findById(req.params.songid)
      .exec(function(err, song){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }
        else if(!song){
          sendJsonResponse(res, 404, {"message": "No song is found!"});
          return;
        }
        else
          sendJsonResponse(res, 200, song);
      });
  }else{
    sendJsonResponse(res, 404, {"message": "No songid is found!"});
  }
}

// Add new song to the DB
module.exports.createSong = function(req , res){
  Song
    .create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      youtubeID: req.body.youtubeID,
      lyrics: req.body.lyrics,
      tab: req.body.tab,
      cover: req.body.cover
    }, function(err, song){
      if(err){
        sendJsonResponse(res, 404, err);
        return;
      }else if (!song){
        sendJsonResponse(res, 404, {"message": "No song is added!"}) ;
        return;
      } else{
        sendJsonResponse(res, 201, song);
      }
    })
};

// Update a specific song in the DB
module.exports.updateSong = function(req , res){
  if(req.params && req.params.songid){
    Song
      .findById(req.params.songid)
      .exec(function(err, song){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!song){
          sendJsonResponse(res, 404, {"message": "Couldn't find the song!"});
          return;
        }else{
          if(req.body.title)
            song.title= req.body.title;
          if(req.body.artist)
            song.artist= req.body.artist;
          if(req.body.album)
            song.album= req.body.album;
          if(req.body.year)
            song.year= req.body.year;
          if(req.body.genre)
            song.genre= req.body.genre;
          if(req.body.youtubeID)
            song.youtubeID= req.body.youtubeID;
          if(req.body.lyrics)
            song.lyrics= req.body.lyrics;
          if(req.body.tab)
            song.tab= req.body.tab;
          if(req.body.cover)
            song.cover= req.body.cover;

          song.save(function(err, song){
            if(err){
              sendJsonResponse(res, 404, err);
            }else{
              sendJsonResponse(res, 200, song);
            }
          });
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message":"No songid found!"});
  }
};

module.exports.deleteSong = function(req , res){

};
