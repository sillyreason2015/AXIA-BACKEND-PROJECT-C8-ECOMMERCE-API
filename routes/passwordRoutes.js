import router from 'express';  // Import Express router

// Import password-related controller functions
import { resetPassword } from '../controllers/passwordApi/passwordBarrel.js'
import { requestPassword } from '../controllers/passwordApi/passwordBarrel.js'

const passwordRouter = router() 

// Route to reset a user's password using a token
passwordRouter.post('/reset', resetPassword)

// Route to request a password reset link/token
passwordRouter.post('/reqreset', requestPassword)

export default passwordRouter
