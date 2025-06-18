const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogs',
        required: true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
}
,{
    timestamps: true,
}
);

module.exports =  mongoose.model("likes", likeSchema);
