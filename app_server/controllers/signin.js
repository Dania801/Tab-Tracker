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
    },
    url: req.originalUrl
  }) ;
}

module.exports.registerAccountPage = function(req , res){
  console.log('registerAccountPage is activated');
  renderRegisterAccount(req, res);
};

module.exports.registerUser = function(req, res){
  console.log('registerUser is activated');
  var requestOptions, path, data ;
  path = '/user' ;
  data = {
    username : req.body.username ,
    email : req.body.email ,
    password : req.body.password
  };
  console.log(data) ;
  requestOptions = {
    url: apiOptions.server + path ,
    method: 'POST' ,
    json : data
  };
  request(requestOptions, function(err, response, body){
    console.log(response.statusCode) ; 
    if(response.statusCode === 201){
      console.log(body);
      res.redirect('/');
    }
    else{
      console.log('ERROR IN POSTING !!!');
    }
  });

};
