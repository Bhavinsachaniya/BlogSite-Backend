const  express = require('express');
const {signUp, login, VerifyOtpLogin, sendOtpLogin} = require('../controllers/userController');
const router = express.Router();


//* User Singup route
router.post('/signup', signUp);

//* User Login route
router.post('/login', login);
router.post('/send-otp', sendOtpLogin,)
router.post('/login/verify', VerifyOtpLogin);

module.exports = router;