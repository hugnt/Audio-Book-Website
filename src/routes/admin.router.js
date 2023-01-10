const express = require('express');
const router = express.Router();
const adminController = require('../admin/controllers/AdminController');

router.get('/', adminController.admin);

module.exports = router