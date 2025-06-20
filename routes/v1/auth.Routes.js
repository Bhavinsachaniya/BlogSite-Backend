const express = require('express');
const router = express.Router();

const { userController} = require('../../controllers');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/send-otp',userController.sendOtpLogin);
router.post('/login/verify', userController.VerifyOtpLogin);
router.post('/deleteAuthor', userController.authorAccountDelete);


module.exports = router;