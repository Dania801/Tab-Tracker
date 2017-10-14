var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};

var renderSongTab = function(req, res, body){
  res.render('tab1' , {
    request: req.params.songid,
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    songInfo: body
  }) ;
}

module.exports.songTab = function(req , res){
  var requestOptions, path ;
  path = '/api/songs/' + req.params.songid;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };

  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderSongTab(req, res, body);
    }
  })
};


var renderExtededSongTab = function(req, res, body){
  res.render('tab2' , {
    request: req.params.songid,
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songInfo: body
  }) ;
}

module.exports.extendedSongTab = function(req , res){
  var requestOptions, path;
  path = '/api/songs/' + req.params.songid ;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  }
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderExtededSongTab(req, res, body);
    }
  })
};


var renderEditSong = function(req, res, body){
  res.render('edit' , {
    request: req.params.songid,
    title: 'Edit Song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songInfo: body
  }) ;
};

module.exports.editSong = function(req, res){
  var requestOptions, path;
  path = '/api/songs';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  }
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderEditSong(req, res, body);
    }
  })
};
