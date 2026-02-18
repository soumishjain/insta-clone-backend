const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ""
    },
    imageUrl : {
        type : String,
        required : [true , "Image Url is required"]
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    likeCount : {
        type : Number,
        default : 0
    }
})

const postModel = mongoose.model('posts',postSchema)
module.exports=postModel