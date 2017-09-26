var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Account = mongoose.model('Account');

var sendJsonResponse = function(res , status , content){
  res.status(status);
  res.json(content);
};

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

module.exports.createSong = function(req , res){

};

module.exports.updateSong = function(req , res){

};

module.exports.deleteSong = function(req , res){

};
