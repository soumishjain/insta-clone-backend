const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controllers.js')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})


postRouter.post('/', upload.single("imageUrl") , postController.createPost)

module.exports=postRouter