var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home.js') ;
var ctrlSong = require('../controllers/song.js') ;
var ctrlSignin = require('../controllers/signin.js') ;
var ctrlAbout = require('../controllers/about.js') ;


/* Home pages. */
router.get('/song/:songid' , ctrlSong.extendedSongTab) ;
router.get('/song/:songid/edit' , ctrlSong.editSong) ;
router.post('/song/:songid/edit', ctrlSong.doEditSong) ;

router.get('/' , ctrlHome.songList) ;
router.post('/home/:userid' , ctrlHome.addSometing) ;
router.get('/home/:userid' , ctrlHome.extendedSongList) ;

router.get('/add/:userid' , ctrlHome.addSong) ;
router.post('/add/:userid' , ctrlHome.doAddSong) ;
router.get('/song/:songid' , ctrlSong.songTab) ;

router.get('/signin' , ctrlSignin.signinAccount) ;
router.post('/signin', ctrlSignin.doSigninAccount) ;
router.get('/signin/reg' , ctrlSignin.registerAccountPage) ;
router.post('/signin/reg', ctrlSignin.registerUser) ;

router.get('/home/about' , ctrlAbout.extendedAboutPage) ;
router.get('/about' , ctrlAbout.aboutPage) ;


module.exports = router;
