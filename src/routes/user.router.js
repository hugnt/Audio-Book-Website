const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const appController = require('../app/controllers/AppController');
const audioController = require('../app/controllers/AudioController');
const bookController = require('../app/controllers/BookController');
const userController = require('../app/controllers/UserController');
const fileUpload = require('express-fileupload');
router.use(fileUpload());
router.use(bodyParser.json());

const fs = require('fs');

const storeController = require('../app/controllers/StoreController');
router.get('/bookstore/:id', storeController.getById);

router.get('/login', appController.signup);
router.get('/', appController.home);
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
router.get('/studio', appController.audio_book);

router.get('/audio_book/:id', audioController.getById);
router.post('/audio_book/api/:user_name/:audio_id', audioController.getByAPI);

//reading book
router.get('/bookmark_reading/:id', bookController.getById);
router.get('/bookmark_reading/css/black-book-view.css', function (req, res) {
    res.redirect('/css/black-book-view.css');
});
router.get('/bookmark_reading/templates/default-book-view.html', function (req, res) {
    res.redirect('/templates/default-book-view.html');
});

router.get('/bookmark_reading/js/default-book-view.js', function (req, res) {
    res.redirect('/js/default-book-view.js');
});


//upload
router.post('/uploadFile/:user_name', function (req, res) {
    let user_name = req.params.user_name;
    // Lấy file từ request
    let uploadedFile = req.files.uploadFile;

    // Xác định đường dẫn tới thư mục clientFiles
    const UPLOADS_DIR = path.join(__dirname, '..', 'app', 'public', 'clientFiles', user_name);

    // Tạo thư mục clientFiles/user_name nếu nó chưa tồn tại
    if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR);
    }

    // Lưu file vào thư mục clientFiles/user_name
    uploadedFile.mv(path.join(UPLOADS_DIR, uploadedFile.name), function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        //router.get('/bookstore/:id', storeController.getById);

        res.send('Tải tệp tin lên thành công');
    });
});


//USER
router.get('/user/:id', userController.getById);
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userLogin = {
        username, 
        password
    }
    try {
        var isValidUser = await userController.login(userLogin);
        if (isValidUser==null) {
          res.status(404).send({ error: 'Account does not exist' });
        } else {
          res.status(200).send({
            username,
            accessToken: isValidUser
          });
        }
      } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
      }
  });

router.post('/register', async (req, res) => {
const username = req.body.username;
const password = req.body.password;
const userLogin = {
    username, 
    password
}
try {
    var isValidUser = await userController.register(userLogin);
    if (isValidUser==null) {
        res.status(500).send({ error: 'Account is already exist' });
    } else {
        res.status(200).send({
        username,
        accessToken: isValidUser
        });
    }
    } catch (error) {
    res.status(500).send({ error: 'An error occurred' });
    }
});
router.get('/profile/:username', userController.openProfile);

module.exports = router
