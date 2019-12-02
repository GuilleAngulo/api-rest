const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.store);
router.post('/authenticate', UserController.authenticate);
router.post('/forgot_password', UserController.forgotPassword);
router.post('/reset_password', UserController.resetPassword);

module.exports = router;