const express = require('express');
const router = express.Router();
const adminController = require('../admin/controllers/AdminController');
const audioBookAdmin = require('../audioBookAdmin');
router.get('/', adminController.admin);
// router.get('/test', audioBookAdmin);

module.exports = router