const express = require('express');
const router = express.Router();
const {BlogController} = require('../controllers/index');

router.post('/createBlog', BlogController.createBlog);
router.get('/readAll', BlogController.readAll);
router.get('/authorAllblog', BlogController.authorAllBlog);
router.post('/deleteBlogPost', BlogController.deleteBlogPost);


module.exports = router;