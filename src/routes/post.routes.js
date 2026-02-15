const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controllers.js')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})


postRouter.post('/', upload.single("imageUrl") , postController.createPost)
postRouter.get('/',postController.getPostsfromUser)
postRouter.get('/detail/:postId',postController.getPostsDetail)

module.exports=postRouter