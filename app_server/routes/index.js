var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home.js') ;
var ctrlSong = require('../controllers/song.js') ;
var ctrlSignin = require('../controllers/signin.js') ;
var ctrlAbout = require('../controllers/about.js') ;


/* Home pages. */
router.get('/' , ctrlHome.songList) ;
router.get('/home' , ctrlHome.extendedSongList) ;
router.get('/home/add' , ctrlHome.addSong) ;
/*router.get('/about' , ctrlAbout.aboutPage) ;
router.get('/home/about/' , ctrlAbout.extdededAboutPage) ;*/
router.get('/song' , ctrlSong.songTab) ;
router.get('/home/song' , ctrlSong.extendedSongTab) ;
router.get('/home/song/edit' , ctrlSong.editSong) ;
router.get('/signin' , ctrlSignin.signinAccount) ;
router.get('/signin/reg' , ctrlSignin.registerAccount) ;


module.exports = router;
