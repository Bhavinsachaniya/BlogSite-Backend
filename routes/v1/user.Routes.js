const  express = require('express');
const {UserController} = require('../controllers/index');
const {followController} = require('../controllers/index');
const { followerController } = require('../../controllers');
const router = express.Router();



//* User Singup route
router.post('/signup', UserController.signUp);

//* User Login route
router.post('/login', UserController.login);
router.post('/send-otp',UserController.sendOtpLogin,)
router.post('/login/verify', UserController.VerifyOtpLogin);
router.post('/deleteAuthor', UserController.authorAccountDelete);

//* follower routes
router.post('/followUser',followController.followUser);
router.post('/unfollowUser',followController.unfollowUser);
router.get('/:userId',followerController.getFollowing);
router.get('/getFollowers', followController.getFollowers);


module.exports = router;