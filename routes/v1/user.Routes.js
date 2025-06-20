const express = require('express');
const router = express.Router();
const {followerController} = require('../../controllers');

//* follower routes
router.post('/getFollowers', followerController.getFollowers);
router.post('/followUser',followerController.followUser);
router.post('/unfollowUser',followerController.unfollowUser);
router.get('/:userId',followerController.getFollowing);

module.exports = router;