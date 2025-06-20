const { likeController } = require('../../controllers');
const express = require('express');
const { route } = require('./auth.Routes');
const router = express.Router();

router.post('/addlike', likeController.likeToggle);
router.get('/getalllike/:blogId',likeController.getAllLike);
router.post('/getAllLikeDetails', likeController.getAllLikeDetails);


module.exports = router;