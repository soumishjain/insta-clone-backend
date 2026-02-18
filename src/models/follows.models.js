const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower : {
        type: String
    },
    followee : {
        type: String
    },
    status : {
        type : String,
        enum : {
            values : ['accepted','rejected','pending'],
            message : "status can only be accepted,rejected,or pending"
        },
        default : "pending"
    }
},{
    timestamps: true
})

followSchema.index({followee : 1 , follower : 1} , {unique : true})

const followModel = mongoose.model('follows',followSchema)
module.exports = followModel