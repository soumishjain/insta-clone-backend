const followModel = require('../models/follows.models')
const likeModel = require('../models/Likes.models')
const postModel = require('../models/post.models')
const userModel = require('../models/user.models')

async function followUser(req,res){
    const followerName = req.user.username
    const followeeName = req.params.username

    const isUserExist = await userModel.findOne({
        username : followeeName
    })

    if(!isUserExist){
        return res.status(404).json({
            message : "No user found"
        })
    }

    if(followeeName == followerName) {
        return res.status(409).json({
            message : "You cannot follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        followee : followeeName,
        follower : followerName
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message : `You are already following ${followeeName}` 
        })
    }

    const followRecord = await followModel.create({
        follower: followerName,
        followee: followeeName,
        status : "pending"
    })

    res.status(201).json({
        message : `You are now following ${followeeName}`,
        followRecord
    })

}

async function unfollowUser(req,res){
    const followerName = req.user.username
    const followeeName = req.params.username

    const isUserFollowed = await followModel.findOne({
        followee : followeeName,
        follower : followerName
    })

    if(!isUserFollowed){
        return res.status(200).json({
            message : `You are not following ${followeeName}`
        })
    }

    await followModel.findOneAndDelete({
        followee : followeeName,
        follower : followerName
    })

    res.status(200).json({
        message : "User Successfully unfollowed"
    })
}

async function likePost(req,res){

    const postId = req.params.postId
    const username = req.user.username

    const isPostExist = await postModel.findById(postId)
    if(!isPostExist) {
        return res.status(404).json({
            message : "post not found"
        })
    }


    const isAlreadyLiked = await likeModel.findOne({
        postId : postId,
        username : username
    })

    if(isAlreadyLiked){
        return res.status(400).json({
            message : "post already liked",
            isAlreadyLiked
        })
    }

    const likeRecord = await likeModel.create({
        postId : postId,
        username : username
    })

const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: 1 } },
    { returnDocument: 'after' }
)

console.log("Updated Like Count:", updatedPost.likeCount)


    res.status(200).json({
        message : "post liked successfully",
        likeRecord
    })
}

async function dislikePost(req,res){
    const postId = req.params.postId
    const username = req.user.username

    const isPostExist = await postModel.findById(postId)
    if(!isPostExist) {
        return res.status(404).json({
            message : "post not found"
        })
    }

    const isLiked = await likeModel.findOne({
        postId : postId,
        username : username
    })

    if(!isLiked){
        return res.status(404).json({
            message : "You cannot dislike an already disliked Post"
        })
    }
    console.log("DISLIKE CALLED")

    await likeModel.findOneAndDelete({
        postId : postId,
        username : username
    })

    const updatePost = await postModel.findByIdAndUpdate(
        postId,
        {$inc : {likeCount: -1}},
        { returnDocument: 'after' }
    )
    console.log(updatePost)

    res.status(200).json({
        message : "post successfully disliked"
    })
}

async function getFollowRequests(req,res) {
    const username = req.user.username
    const requests = await followModel.find({
        followee : username,
        status: 'pending'
    })
    res.status(200).json({
        message : "Requests successfully fetched",
        requests
    })
}

async function acceptRequest(req,res){
    const reqId = req.params.reqId
    const updatedRequest = await followModel.findOneAndUpdate(
    { _id: reqId, followee: req.user.id },
    { status: "Accepted" },
    { returnDocument: "after" }
)

if(!updatedRequest){
    return res.status(404).json({
        message: "Request not found or unauthorized"
    })
}
}

async function rejectRequest(req,res){
    const reqId = req.params.reqId
    const request = await followModel.findById(reqId)
    if(!request) {
        return res.status(404).json({
            message : "request not found"
        })
    }

    await followModel.findByIdAndDelete(reqId)

    res.status(200).json({
        message : "Request Rejected",
    })
}

module.exports={
    followUser,
    unfollowUser,
    likePost,
    dislikePost,
    getFollowRequests,
    rejectRequest,
    acceptRequest

}