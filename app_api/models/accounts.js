var mongoose = require( 'mongoose' );

var songSchema = new mongoose.Schema({
  title: {type: String , required: true},
  artist: {type: String, required: true},
  album: {type: String, required: false, "default": 'Unspecified album'},
  year: {type: String, require: false, "default": '-'},
  genre: {type: String, require: false, "default": 'Unspecified genre'},
  youtubeID: {type: String, require: false, "default": '-'},
  lyrics: {type: String, require: true},
  tab: {type: String, require: true},
  cover: {type: String, require: false, "default": '../images/unknown.jpg'}
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: mongoose.Schema.Types.Mixed, required: true}
});

var accountSchema = new mongoose.Schema({
  userInfo : {type: userSchema, required: true},
  bookmarkedSongs : {type: [songSchema], require: false, "default": []} ,
  recentlyViewed : {type: [songSchema], require: false, "default": []}
});

var allUsersSchema = new mongoose.Schema({
  allSongs: {type: [songSchema], required: false, "default":[]},
  allUsers: {type: [accountSchema], required: false, "default":[]}
});

mongoose.model('User', allUsersSchema, 'users');
