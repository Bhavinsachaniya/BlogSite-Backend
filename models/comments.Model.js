const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    authorid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
});

module.exports = mongoose.model('Comments', commentSchema);