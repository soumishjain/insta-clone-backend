const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req, res) {
    console.log("register hit route")
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: (isUserAlreadyExists.email == email ? "user already exists with this email" : "user already exists with this username")
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username, email, password: hash, bio, profileImage
    })
    const token = jwt.sign({
        id: user._id,
        username : user.username
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token", token)

    res.status(209).json({
        message: "User successfully registerd",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    }
    )
}

async function loginUser(req, res) {
    console.log('route hit')
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(409).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign(
        {id : user._id,
            username : user.username
        },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' })
    
    res.cookie('token',token)
    res.status(200).json({
        message : "User Successfully Logged in",
        user : {
            username : user.username,
            email : user.email,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
}

module.exports={
    registerUser,
    loginUser
}