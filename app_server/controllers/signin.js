module.exports.signinAccount = function(req , res){
  res.render('login' , {title: 'Login'}) ;
};

module.exports.registerAccount = function(req , res){
  res.render('signup' , {title: 'Register'}) ;
};
