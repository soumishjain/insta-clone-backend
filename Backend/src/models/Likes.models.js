const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts",
        required : [true,"post id is required to like a post"]
    },
    username : {
        type : String,
        required : [true,"username is required to  like a post"]
    }
} , {
    timestamps : true
})

likeSchema.index({postId : 1 , username : 1} , {unique : true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports=likeModel