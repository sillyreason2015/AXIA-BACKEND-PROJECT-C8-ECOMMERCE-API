import router from 'express'// Import Express router
import authMiddleware from '../middleware/authMiddleware.js'// Middleware to protect user routes

// Import controller functions for user authentication
import { loginUser } from '../controllers/authApi/adminBarrel.js'
import { logoutUser } from '../controllers/authApi/adminBarrel.js'

const authRouter = router()

// Public route: user login
authRouter.post('/login', loginUser)

// Protected route: user logout 
authRouter.post('/logout',authMiddleware,logoutUser)

export default authRouter
