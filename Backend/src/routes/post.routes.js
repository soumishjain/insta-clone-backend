const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controllers.js')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})
const identifyUser = require('../middleware/auth.middleware.js')


postRouter.post('/', upload.single("imageUrl") , identifyUser ,postController.createPost)
postRouter.get('/', identifyUser ,postController.getPostsfromUser)
postRouter.get('/detail/:postId', identifyUser ,postController.getPostsDetail)

module.exports=postRouter