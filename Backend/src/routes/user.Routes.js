const express = require('express')
const userRouter = express.Router()

const identifyUser = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controllers')

userRouter.post('/follow/:username',identifyUser,userController.followUser)
userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUser)
userRouter.post('/like/:postId',identifyUser,userController.likePost)
userRouter.post('/dislike/:postId',identifyUser,userController.dislikePost)
userRouter.get('/follow-requests',identifyUser,userController.getFollowRequests)
userRouter.post('/follow-requests/:reqId/accept',identifyUser,userController.acceptRequest)
userRouter.post('/follow-requests/:reqId/reject',identifyUser,userController.rejectRequest)


module.exports=userRouter