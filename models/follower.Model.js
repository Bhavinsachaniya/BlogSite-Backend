const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
},{
    timestamps: true 
});

module.exports = mongoose.model('followers',followerSchema);