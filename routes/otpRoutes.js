import router  from 'express'
  

import {verifyOtp, resendOtp} from '../controllers/otpApi/otpBarrel.js'



const otpRouter = router()

otpRouter
.post('/verify', verifyOtp)
.post('/resend', resendOtp)



export default otpRouter;