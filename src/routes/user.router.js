const express = require('express');
const router = express.Router();
const appController = require('../app/controllers/AppController');
const audioController = require('../app/controllers/AudioController');
const bookController = require('../app/controllers/BookController');

router.get('/home', appController.home);
router.get('/home01', appController.home01);
router.get('/home02', appController.home02);
router.get('/loading', appController.loading);
router.get('/signup', appController.signup);
// router.get('/bookmark_reading', appController.bookmark_reading);
router.get('/bookmark', appController.bookmark);
router.get('/bookstore', appController.bookstore);
router.get('/challenge', appController.challenge);
router.get('/community', appController.community);
router.get('/audio_book', appController.audio_book);


router.get('/audio_book/:id', audioController.getById);
router.post('/audio_book/api/:user_name/:audio_id', audioController.getByAPI);

//reading book
router.get('/bookmark_reading/:id', bookController.getById);
router.get('/bookmark_reading/css/black-book-view.css', function(req, res){
    res.redirect('/css/black-book-view.css');
});
router.get('/bookmark_reading/templates/default-book-view.html', function(req, res){
    res.redirect('/templates/default-book-view.html');
});

router.get('/bookmark_reading/js/default-book-view.js', function(req, res){
    res.redirect('/js/default-book-view.js');
});
module.exports = router
