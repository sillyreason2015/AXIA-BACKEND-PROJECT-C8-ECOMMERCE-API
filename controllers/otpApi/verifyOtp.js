import User from '../../schema/userSchema.js'


export const verifyOtp = async (req, res) => {
    const {otp, email} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'User not found. Please register first!'})
        }
        
        
        if(user.isVerified === true){
            return res.status(400).json({message: "User is already Verified"})
        }
       
        if (user.otp !== otp){
          return  res.status(400).json({message: "Incorrect OTP. Please enter OTP again"})
        }

        if (new Date(user.otpExpires) < new Date()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        
        user.otp = undefined
        user.otpExpires = undefined
        user.isVerified = true

        await user.save()
       return res.status(200).json({message: 'Verified Succesfully'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}