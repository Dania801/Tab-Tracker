var express = require('express');
var router = express.Router();
var ctrlSongs = require('../controllers/songs');
var ctrlUsers = require('../controllers/user');
var ctrlRecentlyViewed = require('../controllers/recently');
var ctrlBookmarkedSongs = require('../controllers/bookmarked');

//songs
router.get('/songs', ctrlSongs.SongList);
router.get('/songs/:songid', ctrlSongs.getSong);
router.post('/user/:userid/song', ctrlSongs.createSong);
router.put('/songs/:songid', ctrlSongs.updateSong);
router.delete('/songs/:songid', ctrlSongs.deleteSong);

//users
router.get('/user/:userid', ctrlUsers.getUser);
router.post('/user', ctrlUsers.createUser);
router.put('/user/:userid', ctrlUsers.updateUser);
router.delete('/user/:userid', ctrlUsers.deleteUser);

//recently viewed songs
router.get('/user/:userid/recently', ctrlRecentlyViewed.recentlyViewedList);
router.post('/user/:userid/recently', ctrlRecentlyViewed.createRecentlyViewed);
router.delete('/user/:userid/recently/:recentlyid', ctrlRecentlyViewed.deleteRecentlyViewed);

//bookmarked songs
router.get('/user/:userid/bookmark', ctrlBookmarkedSongs.bookmarkList);
router.post('/user/:userid/bookmark', ctrlBookmarkedSongs.createBookmark);
router.delete('/user/:userid/bookmark/:bookmarkid', ctrlBookmarkedSongs.deleteBookmark);

module.exports = router;
