module.exports.signinAccount = function(req , res){
  res.render('login' , {
    title: 'Login',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    }
  }) ;
};

module.exports.registerAccount = function(req , res){
  res.render('signup' , {
    title: 'Register',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    }
  }) ;
};
