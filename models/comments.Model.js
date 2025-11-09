const mongoose = require('mongoose');
require('./userModel');
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