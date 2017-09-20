module.exports.aboutPage = function(req , res){
  res.render('about1' , {title : 'About'}) ;
};

module.exports.extendedSongList = function(req , res){
  res.render('about2' , {title: 'About'}) ;
};
