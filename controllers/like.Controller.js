const mongoose = require('mongoose');
const likes = require('../models/like.Model');
const post = require('../models/blogModel');

//! getAllLike
//! removeandAdd like

const likeToggle = async (req,res) =>{
    try {
        const {userId, blogId} = req.body;

        if(!userId || !blogId){
            return res
            .status(400)
            .json({
                success: false,
                message: "Both Field required userId and blogId"
            });
        }

        const existLike = await likes.findOne({blogid:blogId, userid: userId});

        if(existLike){
            await likes.deleteOne({ blogid: blogId, userid: userId });

            return res
            .status(200)
            .json(
                {
                    success: true,
                    message: "like successfully Deleted"
                }
            );
        }

        
            const createLike = await likes.create({
                blogid: blogId,
                userid: userId
            });

            return res
            .status(200)
            .json({
                success: true,
                message:"successfully added Like",
                data:createLike

            });
    }
    catch(error){
        return res
        .status(500)
        .json({
            success: false,
            error: error.message
        })
    }
}


const getAllLike = async (req,res) => {
    try{

        const { blogId } =  req.params;
        
        if(!blogId){
            return res
            .status(400)
            .json({
                success:false,
                message:'Blog Id is required'
            });
        }

        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res
            .status(400)
            .json({
                success:false,
                message:'Invalid blog id format'
            });
        }
        
        const totalLikes = await likes.countDocuments({ blogid: blogId });



        return res
        .status(200)
        .json({
            success: true,
            blogId,
            totalLikes
        });
    }
    catch(err){
        return res
        .status(500)
        .json({
            success: false,
            error: err.message
        })
    }
};


const getAllLikeDetails = async (req, res) => {
    try{
        const { blogId } = req.body;
        
        if(!blogId){
            return res.status(400).json({
                success: false,
                message:"blogId is required"
            });
        }

        const blogExist = await post.findOne({_id:blogId});

        if(!blogExist){
            return res.status(400).json({
                success:false,
                message:"blog Doen't Exist"
            });
        }

        const data = await likes.aggregate([
            {
                $match:{
                    blogid:   new mongoose.Types.ObjectId(blogId)
                },
            },
            {
                $lookup:{
                    from:'users',
                    localField:'userid',
                    foreignField:'_id',
                    as:'userDetails'
                }
            },
            {
                $unwind:"$userDetails"
            },
            {
                $project:{
                    _id:1,
                    name:"$userDetails.name",
                    email:'$userDetails.email'
                }
            }
        ]);


        return res.status(200).json({
            success:true,
            data:data,
            message:"all likesDetails"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}





module.exports = {
    getAllLike,
    likeToggle,
    getAllLikeDetails
}