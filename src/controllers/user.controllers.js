const followModel = require('../models/follows.models')
const likeModel = require('../models/Likes.models')
const postModel = require('../models/post.models')
const userModel = require('../models/user.models')

async function followUser(req,res){
    const followerName = req.user.userName
    const followeeName = req.params.userName

    const isUserExist = await userModel.findOne({
        userName : followeeName
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
    const followerName = req.user.userName
    const followeeName = req.params.userName

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
    const userName = req.user.userName

    const isPostExist = await postModel.findById(postId)
    if(!isPostExist) {
        return res.status(404).json({
            message : "post not found"
        })
    }


    const isAlreadyLiked = await likeModel.findOne({
        postId : postId,
        userName : userName
    })

    if(isAlreadyLiked){
        return res.status(400).json({
            message : "post already liked",
            isAlreadyLiked
        })
    }

    const likeRecord = await likeModel.create({
        postId : postId,
        userName : userName
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
    const userName = req.user.userName

    const isPostExist = await postModel.findById(postId)
    if(!isPostExist) {
        return res.status(404).json({
            message : "post not found"
        })
    }

    const isLiked = await likeModel.findOne({
        postId : postId,
        userName : userName
    })

    if(!isLiked){
        return res.status(404).json({
            message : "You cannot dislike an already disliked Post"
        })
    }
    console.log("DISLIKE CALLED")

    await likeModel.findOneAndDelete({
        postId : postId,
        userName : userName
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
    const userName = req.user.userName
    const requests = await followModel.find({
        followee : userName,
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