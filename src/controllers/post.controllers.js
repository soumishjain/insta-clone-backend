const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs')

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});


const postModel = require('../models/post.models')

async function createPost (req , res) {
    console.log(req.body , req.file)

  const file = await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'TestImage',
});
res.send(file)
}

module.exports={
    createPost
}