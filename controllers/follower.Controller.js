const mongoose  = require('mongoose');
const follower = require('../models/follower.Model');

const followUser= async (req,res) => {

    try{
        const {followerId, authorId} = req.body;

        if(followerId === authorId){
            return res.status(400).json({
                success:false,
                message:"You Can't follow yourself"
            });
        }

        const existingFollow = await follower.findOne({follower:followerId, author: authorId});
        if(existingFollow){
            return res.status(400).json({
                success:false,
                message:'Already following this user'
            });
        }

        const follow = await follower.create({follower:followerId, author: authorId});

        return res.status(201).json({
            success:true,
            data: follow
        })
    }
    catch(error){
        return res
                .status(500)
                .json({
                    success: false,
                    error: error.message
                });
    }

};

const unfollowUser = async  (req,res) => {
    try{
        const {followerId, authorId} = req.body;

        const unfollow = await follower.findOneAndDelete({follower:followerId, author:authorId});

        if(!unfollow){
            return res.status(400).json({success: false, message:'Not following this user'});
        }

        return res.status(200).json({success: true, message:'unfollwed successfully'});

    }catch(error){
        return res.status(500).json({success:false, error: error.message});
    }
}

const getFollowers = async (req, res) => {
    const { userId } = req.body;
    try {
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required",
            });
        }

        const followers = await follower.aggregate([
            {
                $match: {
                    author: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'follower',
                    foreignField: '_id',
                    as: 'followerDetails',
                },
            },
            {
                $unwind: {
                    path: '$followerDetails',
                    preserveNullAndEmptyArrays: false, 
                },
            },
            {
                $project: {
                    _id: 0,
                    followerId: '$follower',
                    name: '$followerDetails.name',
                    email: '$followerDetails.email',
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            followers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getFollowing  = async (req,res) => {
    try{
        const {userId}=  req.params;

        const following = await follower.aggregate([
            {
                $match:{
                    follower: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField:'author',
                    foreignField:'_id',
                    as:'authorDetails'
                }
            },
            {
                $unwind:'$authorDetails'
            },
            {
                $project:{
                    _id:0,
                    authorId:'$author',
                    name:'$authorDetails.name',
                    email:'$authorDetails.email'
                }
            }
        ]);

        return res.status(200).json({success:true, following});

    }
    catch(error){
        return res.status(500).json({success:false, error: error.message});
    }
};

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
};