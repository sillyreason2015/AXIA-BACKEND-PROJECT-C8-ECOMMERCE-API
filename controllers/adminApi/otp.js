import Admin from '../../schema/adminSchema.js'
import { sendMail } from '../../utils/sendMail.js'

// Verify admin OTP
export const verifyOtp = async (req, res) => {
    
    // Check secret key for authorization
      const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    const {otp, email} = req.body
    try{
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({message: 'Administrator not found. Please register first!'})
        }
        
        
        if(admin.isVerified === true){
            return res.status(400).json({message: "Admin is already Verified"})
        }
       
        if (admin.otp !== otp){
          return  res.status(400).json({message: "Incorrect OTP. Please enter OTP again"})
        }

        if (new Date(admin.otpExpires) < new Date()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        // Mark admin as verified and clear OTP fields
        admin.otp = undefined
        admin.otpExpires = undefined
        admin.isVerified = true

        await admin.save()
       return res.status(200).json({message: 'Verified Succesfully'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}



// Resend OTP
export const resendOtp = async (req,res) => {
    // Check secret key for authorization
      const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    const {email} = req.body

    try{
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({message: "Administrator not found please register to continue" })
        }
        if(admin.isVerified === true){
            res.status(400).json({message: "OTP is already verified"})
        }
        if(admin.lastOtpSentAt && Date.now() - admin.lastOtpSentAt.getTime() < 2 * 60 * 1000){
            return res.status(429).json({message: "Please try again after 2 minutes"})
        }
        // Limit OTP resend to every 2 minutes
        if (new Date(admin.otpExpires) < new Date()){
            const newOtp = Math.floor(10000 +Math.random() * 900000)
            const otpExpires = new Date(Date.now() + 5 * 60 * 1000)
            
            // If current OTP expired, generate a new one
            admin.otp = newOtp
            admin.otpExpires = otpExpires
            admin.lastOtpSentAt = new Date ()
            await admin.save()

            const mail = {
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: 'Your OTP Code',
            body:`Hi ${admin.name}, your OTP expired. Here is a new one. ${newOtp} and it expires in 5 minutes`
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