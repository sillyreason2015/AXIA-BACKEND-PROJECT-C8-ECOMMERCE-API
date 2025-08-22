import router from 'express';  // Import Express router

// Import OTP controller functions
import { verifyOtp, resendOtp } from '../controllers/otpApi/otpBarrel.js'

const otpRouter = router()

// Route to verify a user's OTP
otpRouter.post('/verify', verifyOtp)

// Route to resend a new OTP to the user
otpRouter.post('/resend', resendOtp)

export default otpRouter;  
