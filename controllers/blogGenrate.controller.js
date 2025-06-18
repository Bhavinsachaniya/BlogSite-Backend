const express = require('express');
const mongoose = require('mongoose');
const post = require('../models/blogModel');
const User = require('../models/userModel');

const createBlog = async (req, res) => {

    try {

        const { title, blog, author } = req.body;

        if (!title || !blog || !author) {
            res.status(404).json({ message: "All Field is required" })
        }

        const newBlog = new post({
            title: title,
            content: blog,
            author: author
        });

        await newBlog.save();

        return res.status(200).json({
            success: true,
            message: "Post Created Sucessfully",
            data: newBlog
        })

    }
    catch (err) {
        return res.status(501).json({
            sucess: false,
            message: "Getting a problem in creating the blog",
            error: err.message
        })
    }

};

//! write code for read all available blog

const readAll = async (req, res) => {

    try {

        const readAllblog = await post.find();

        if (readAllblog.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blog data found in the database"
            });
        }


        return res.status(200).json({
            success: true,
            message: "All data successfully fetched",
            data: readAllblog
        })

    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "Getting error in reading all blog",
            error: error.message
        })
    }
}


const authorAllBlog = async (req, res) => {
    try {
        const { author } = req.body;


        if (!author) {
            return res.status(400).json({
                success: false,
                message: "Author ID is required to fetch posts"
            });
        }


        const authorExists = await User.findById(author);
        if (!authorExists) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }


        const allBlog = await post.find({ author });


        return res.status(200).json({
            success: true,
            message: "All blogs fetched successfully",
            data: allBlog
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching author's blogs",
            error: error.message
        });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const { author, title } = req.body;

        if (!author || !title) {
            return res.status(404).json({
                success: false,
                message: "All Field is required"
            });
        }

        const deleteBlogPost = await post.deleteOne({ author, title });

        return res.status(200).json({
            success: true,
            message: "Successfully deleted blog posts",
            data: deleteBlogPost
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting blog posts",
            error: error.message
        });
    }
};






module.exports = {
    createBlog,
    readAll,
    authorAllBlog,
    deleteBlogPost
}