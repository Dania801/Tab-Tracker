var express = require('express');
var router = express.Router();
var ctrlSongs = require('../controllers/songs');
var ctrlUsers = require('../controllers/user');
var ctrlRecentlyViewed = require('../controllers/recently');
var ctrlBookmarkedSongs = require('../controllers/bookmarked');

//all
router.get('/all', ctrlUsers.getAll);

//songs
router.get('/songs', ctrlSongs.SongList); // List of added songs
router.get('/songs/:songid', ctrlSongs.getSong); // List of all songs added by a user
router.post('/songs', ctrlSongs.createSong); // Adding new song to allSongs
router.put('/songs/:songid', ctrlSongs.updateSong);
router.delete('/songs/:songid', ctrlSongs.deleteSong);

//users
router.get('/user/:userid', ctrlUsers.getUser); // All info about a user
router.post('/user', ctrlUsers.createUser); // Adding new user to allUsers
router.put('/user/:userid', ctrlUsers.updateUser);
router.delete('/user/:userid', ctrlUsers.deleteUser);

//recently viewed songs
router.get('/user/:userid/recently', ctrlRecentlyViewed.recentlyViewedList); // List of recently viewed songs of a user
router.post('/user/:userid/recently', ctrlRecentlyViewed.createRecentlyViewed);
router.delete('/user/:userid/recently/:recentlyid', ctrlRecentlyViewed.deleteRecentlyViewed);

//bookmarked songs
router.get('/user/:userid/bookmark', ctrlBookmarkedSongs.bookmarkList); // List of bookmarked songs of a user
router.post('/user/:userid/bookmark', ctrlBookmarkedSongs.createBookmark);
router.delete('/user/:userid/bookmark/:bookmarkid', ctrlBookmarkedSongs.deleteBookmark);

module.exports = router;
