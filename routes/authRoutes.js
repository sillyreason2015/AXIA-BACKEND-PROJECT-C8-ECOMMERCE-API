import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'


import { loginUser } from '../controllers/authApi/adminBarrel.js'
import { logoutUser } from '../controllers/authApi/adminBarrel.js'


const authRouter = router()

authRouter
.post('/login',loginUser)
.post('/logout',logoutUser)


export default authRouter