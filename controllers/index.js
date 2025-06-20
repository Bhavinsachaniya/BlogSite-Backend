/* module.exports = {
    BlogController: require('./blogGenrate.controller'),
    userController: require('./user.Controller'),
    followController: require('./follower.Controller'),
};
 */
// controllers/index.js
exports.userController = require('./user.Controller');
exports.followerController = require('./follower.Controller.js');
exports.BlogController = require('./blogGenrate.controller.js');
exports.commentController = require('./comments.controller.js');
exports.likeController = require('./like.Controller.js');



