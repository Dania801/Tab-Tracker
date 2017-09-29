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
      songs: body
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
  res.render('home2' , {
    title: 'Home',
    username: 'Dania',
    caption: 'Here you get a chance to explore the universe of music. Enjoy the available tabs, and add more songs to play and give others an apportunity to learn!',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songs: body,
    recentlyViewed: [{
        title: 'Getting into you',
        artist: 'Reliant K',
        cover: '../images/reliant.jpg'
      },{
        title: 'Yesterday',
        artist: 'The Beatles',
        cover: '../images/beatles.jpg'
      },{
        title: 'Classic car',
        artist: 'Bright Eyes',
        cover: '../images/bright.jpg'
      }],
    bookmarekedSongs: [{
      title: 'Classic car',
      artist: 'Bright Eyes',
      cover: '../images/bright.jpg'
    },{
      title: 'My Heart will go on',
      artist: 'Celine Dion',
      cover: '../images/celine.jpg'
    }]
  }) ;
};

module.exports.extendedSongList = function(req , res){
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
      renderExtededSongList(req, res, body);
    }
  })
};

var renderAddSong = function(req, res){
  res.render('Add' , {
    title: 'Add a new song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    }
  }) ;
};

module.exports.addSong = function(req , res){
  renderAddSong(req, res);
};
