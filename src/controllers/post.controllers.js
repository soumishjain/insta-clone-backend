const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


const postModel = require('../models/post.models')

async function createPost(req, res) {

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'TestImage',
    folder : 'cohort-2-insta-clone/posts'
  });

  const token = req.cookies.token
  console.log(token)

  if(!token) {
    return res.status(401).json({
      message : "Unauthorized Access"
    })
  }
  let decode = null;
  try{
    decode = jwt.verify(token,process.env.JWT_SECRET)
  }catch(err){
    return res.status(401).json({
      message : "Unauthorized Access"
    })
  }
  

  const post = await postModel.create({
    caption : req.body.caption,
    imageUrl : file.url,
    user : decode.id
  })

  res.status(201).json({
    message : "post Successfully created",
    post
  })

}

async function getPostsfromUser(req,res){
  const token = req.cookies.token;
  if(!token){
    return res.status(409).json({
      message : "Unauthorized Access"
    })
  }
  let decode;
  try{
    decode = jwt.verify(token,process.env.JWT_SECRET)
  }catch(err){
    return res.status(409).json({
      message : "Unauthorized Access"
    })
  }
  const userId = decode.id
  const posts = await postModel.find({user : userId})

  res.status(200).json({
    message : "posts fetched successfully",
    posts
  })
}

async function getPostsDetail(req,res){
  const token = req.cookies.token;
  if(!token){
    return res.status(409).json({
      message : "Unauthorized Access"
    })
  }
  let decode;
  try{
    decode = jwt.verify(token,process.env.JWT_SECRET)
  }catch(err){
    return res.status(409).json({
      messaege : "Unauthorized Access"
    })
  }

  const userId = decode.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message : "not found"
    })
  }

  const isUserValid = userId === post.user.toString()

  if(!isUserValid) {
    return res.status(403).json({
      message : "forbidden content"
    })
  }

  res.status(200).json({
    message : "req fetched succesfully",
    post
  })

}

module.exports = {
  createPost,
  getPostsfromUser,
  getPostsDetail
}