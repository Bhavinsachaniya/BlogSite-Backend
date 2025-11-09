const mongoose = require('mongoose');
const Comment = require('../models/comments.Model'); // ✅ Use PascalCase for model

//! addcomment, deleteComment, allComments

//! Get all comments for a blog
const allComments = async (req, res) => {
    try {
        const { blogId } = req.body;

        if (!blogId) {
            return res.status(404).json({
                success: false,
                message: "blogId is required"
            });
        }
        
        const allComments = await Comment.find({ blogid: blogId }).populate('userid', 'name');

        return res.status(200).json({
            success: true,
            comments: allComments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching comments",
            error: error.message
        });
    }
};

//! Add a comment to a blog
const addcomment = async (req, res) => {
    try {
        const { userId, blogId, content } = req.body;

        if (!userId || !blogId || !content) {
            return res.status(400).json({
                success: false,
                message: "userId, blogId, and content are required"
            });
        }

        const newComment = await Comment.create({
            content: content,
            blogid: blogId,
            userid: userId
        });

        return res.status(200).json({
            success: true,
            message: "Successfully added comment",
            comment: newComment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding comment",
            error: err.message
        });
    }
};

//! Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body || {};
        
        if (!commentId) {
            return res.status(404).json({
                success: false,
                message: "commentId is required"
            });
        }

        const deletedComment = await Comment.findOneAndDelete({ _id: commentId });

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the comment",
            error: error.message
        });
    }
};


module.exports = {
    addcomment,
    allComments,
    deleteComment
};
