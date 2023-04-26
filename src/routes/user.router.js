const express = require('express');
const router = express.Router();
const appController = require('../app/controllers/AppController');
const audioController = require('../app/controllers/AudioController');
const storeController = require('../app/controllers/StoreController');

router.get('/home', appController.home);
router.get('/home01', appController.home01);
router.get('/home02', appController.home02);
router.get('/loading', appController.loading);
router.get('/signup', appController.signup);
router.get('/bookmark_reading', appController.bookmark_reading);
router.get('/bookmark', appController.bookmark);
router.get('/bookstore', appController.bookstore);
router.get('/challenge', appController.challenge);
router.get('/community', appController.community);
router.get('/audio_book', appController.audio_book);


router.get('/audio_book/:id', audioController.getById);
router.get('/audio_book/api/:content/:voice/:speed', audioController.getByAPI);

router.get('/bookstore/:id', storeController.getById);


module.exports = router
