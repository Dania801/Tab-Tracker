var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home.js') ;
var ctrlSong = require('../controllers/song.js') ;
var ctrlSignin = require('../controllers/signin.js') ;
var ctrlAbout = require('../controllers/about.js') ;


/* Home pages. */
router.get('/' , ctrlHome.songList) ;
router.get('/home/:userid' , ctrlHome.extendedSongList) ;
router.get('/add' , ctrlHome.addSong) ;
router.post('/add' , ctrlHome.doAddSong) ;
router.get('/about' , ctrlAbout.aboutPage) ;
router.get('/home/about' , ctrlAbout.extendedAboutPage) ;
router.get('/song/:songid' , ctrlSong.songTab) ;
router.get('/home/song/:songid' , ctrlSong.extendedSongTab) ;
router.get('/home/song/:songid/edit' , ctrlSong.editSong) ;
router.get('/signin' , ctrlSignin.signinAccount) ;
router.get('/signin/reg' , ctrlSignin.registerAccount) ;


module.exports = router;
