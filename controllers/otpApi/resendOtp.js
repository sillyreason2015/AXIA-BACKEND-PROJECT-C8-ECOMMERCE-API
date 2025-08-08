import User from '../../schema/userSchema.js'
import { sendMail } from '../../utils/sendMail.js'

export const resendOtp = async (req,res) => {
    const {email} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found please register to continue" })
        }
        if(user.isVerified === true){
            res.status(400).json({message: "OTP is already verified"})
        }
        if(user.lastOtpSentAt && Date.now() - user.lastOtpSentAt.getTime() < 2 * 60 * 1000){
            return res.status(429).json({message: "Please try again after 2 minutes"})
        }
        if (new Date(user.otpExpires) < new Date()){
            const newOtp = Math.floor(10000 +Math.random() * 900000)
            const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

            user.otp = newOtp
            user.otpExpires = otpExpires
            user.lastOtpSentAt = new Date ()
            await user.save()

            const mail = {
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: 'Your OTP Code',
            body:`Hi ${user.username}, your OTP expired. Here is a new one. ${newOtp} and it expires in 5 minutes`
        }
    
        await sendMail(mail)
        return res.status(400).json({message: 'OTP expired. A new OTP has been sent to your email address'})
    }else{
        return res.status(400).json({message: "Your Current OTP is still valid"})
    }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}