module.exports.songList = function(req , res){
  res.render('home1' , {title: 'Welcome to Tab Tracker'}) ;
};

module.exports.extendedSongList = function(req , res){
  res.render('home2' , {title: 'Welcome to Tab Tracker'}) ;
};

module.exports.addSong = function(req , res){
  res.render('Add' , {title: 'Add a new song'}) ;
};
