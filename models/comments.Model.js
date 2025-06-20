const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
});

module.exports = mongoose.model('Comments', commentSchema);