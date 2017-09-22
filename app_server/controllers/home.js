module.exports.songList = function(req , res){
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
      songs: [{
        title: 'My Heart will go on',
        artist: 'Celine Dion',
        cover: '../images/celine.jpg'
      },{
        title: 'Yesterday',
        artist: 'The Beatles',
        cover: '../images/beatles.jpg'
      },{
        title: 'Getting into you',
        artist: 'Reliant K',
        cover: '../images/reliant.jpg'
      },{
        title: 'Classic car',
        artist: 'Bright Eyes',
        cover: '../images/bright.jpg'
      }]
    }
  }) ;
};

module.exports.extendedSongList = function(req , res){
  res.render('home2' , {
    title: 'Home',
    username: 'Dania',
    caption: 'Here you get a chance to explore the universe of music. Enjoy the available tabs, and add more songs to play and give others an apportunity to learn!',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songs: [{
      title: 'My Heart will go on',
      artist: 'Celine Dion',
      cover: '../images/celine.jpg'
    },{
      title: 'Yesterday',
      artist: 'The Beatles',
      cover: '../images/beatles.jpg'
    },{
      title: 'Getting into you',
      artist: 'Reliant K',
      cover: '../images/reliant.jpg'
    },{
      title: 'Classic car',
      artist: 'Bright Eyes',
      cover: '../images/bright.jpg'
    }],
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

module.exports.addSong = function(req , res){
  res.render('Add' , {title: 'Add a new song'}) ;
};
