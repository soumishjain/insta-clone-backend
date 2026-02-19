const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bio : String,
    profileImage : {
        type : String,
        default : "https://ik.imagekit.io/soumisjain/default-avatar-profile-icon-social-600nw-1906669723.webp"
    }
})

const userModel = mongoose.model("user",userSchema)
module.exports=userModel