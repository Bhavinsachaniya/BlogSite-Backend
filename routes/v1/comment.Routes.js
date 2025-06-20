const { commentController } = require('../../controllers');
const express = require('express');
const router = express.Router();

router.post('/addcomment', commentController.addcomment);  
router.post('/allComments', commentController.allComments); 
router.post('/deleteComment', commentController.deleteComment);

module.exports = router;
