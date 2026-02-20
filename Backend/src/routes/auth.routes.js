const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controllers')
const identifyUser = require('../middleware/auth.middleware.js')



authRouter.post('/register', authController.registerUser)

authRouter.post('/login', authController.loginUser)

authRouter.get('/get-my-details',identifyUser,authController.getMyDetails)
module.exports = authRouter