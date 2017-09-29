var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};

var renderSigninAccount = function(req, res){
  res.render('login' , {
    title: 'Login',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    }
  }) ;
}

module.exports.signinAccount = function(req , res){
  renderSigninAccount(req, res);
};


var renderRegisterAccount = function(req, res){
  res.render('signup' , {
    title: 'Register',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    }
  }) ;
}

module.exports.registerAccount = function(req , res){
  renderRegisterAccount(req, res);
};
