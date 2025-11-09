const mongoose = require('mongoose');
require('./userModel');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    tagid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tags',
    }
});

module.exports = mongoose.model('Post', postSchema);