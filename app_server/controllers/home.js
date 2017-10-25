var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};


var renderSongList = function(req, res, body){
  res.render('home1' , {
    title: 'Welcome to Tab Tracker',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    cover: {
      title: 'Tab Tracker',
      desc: 'Keep Track of guitar tabs !'
    },
    featured: {
      title: 'FEATURED SONGS',
      songs: body[0].allSongs
    }
  });
};

module.exports.songList = function(req , res){
  var requestOptions, path;
  path = '/api/songs';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions,function(err, response, body){
    if(err){

    }else{
      renderSongList(req, res, body);
    }
  })
};


var renderExtededSongList = function(req, res, body){
  console.log(req.params.userid);
  console.log(body[0].allUsers)
  var theUser;
  for(var i = 0 ; i < body[0].allUsers.length; i++){
    if(body[0].allUsers[i]._id == req.params.userid){
      theUser = body[0].allUsers[i] ;
      break;
    }
  }
  res.render('home2' , {
    request: req.params.userid ,
    title: 'Home',
    username: 'Dania',
    caption: 'Here you get a chance to explore the universe of music. Enjoy the available tabs, and add more songs to play and give others an apportunity to learn!',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songs: body[0].allSongs,
    recentlyViewed: theUser.recentlyViewed,
    bookmarkedSongs: theUser.bookmarkedSongs
  }) ;
};



module.exports.extendedSongList = function(req , res){
  var requestOptions1, path1 ;
  path1 = '/api/all';
  requestOptions1 = {
    url: apiOptions.server + path1,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions1, function(err, response, body){
    if(err){

    }else{
      renderExtededSongList(req, res, body);
    }
  })
};

var renderAddSong = function(req, res, body){
  res.render('Add' , {
    title: 'Add a new song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    url: req.originalUrl
  }) ;
};

module.exports.addSong = function(req, res){
  var requestOptions, path ;
  path = '/api/songs';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderAddSong(req, res, body);
    }
  });
};

module.exports.doAddSong = function(req, res){
  var requestOptions, path, data;
  path = '/songs';
  data = {
    title : req.params.title ,
    artist : req.params.artist ,
    album : req.params.album ,
    year : req.params.year ,
    genre : req.params.genre ,
    lyrics : req.params.lyrics ,
    tab : req.params.tab ,
    cover : req.params.cover,
    youtubeID : req.params.youtubeID
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: data
  };
  request(requestOptions, function(err, response, body){
    if(res.statusCode === 201){
      console.log(body);
      res.redirect('/');
    }
    else{
      console.log('ERROR IN POSTING !!!');
    }
  });
};
