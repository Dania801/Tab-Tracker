module.exports.songTab = function(req , res){
  res.render('tab1' , {title: 'Song Tabs'}) ;
};

module.exports.extendedSongTab = function(req , res){
  res.render('tab2' , {title: 'Song Tabs'}) ;
};

module.exports.editSong = function(req , res){
  res.render('edit' , {title: 'Edit Song'}) ;
};
