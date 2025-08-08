import User from '../../schema/userSchema.js'
import bcrypt from 'bcrypt'
import genToken from '../../jwt/gentoken.js'
import { sendMail } from '../../utils/sendMail.js'


export const loginUser = async (req, res) => {
    const {email, password} = req.body
   
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }
   
    if(!email || !password){
        return res.status(400).json({message: "Email and Password Required"})
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "This user does not exist. Please Register to continue"})
        }

        if(!user.isVerified){
          return res.status(400).json({message: "Please Verify OTP before login"})
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({message: "Invalid login credentials"})
        }
       
        await sendMail(mail)
        const token = genToken({userId: user._id})
        return res
        .cookie('token', token, {httpOnly: true, sameSite:'strict', secure: false, path: '/'})
        .status(200).json({message: "Login Successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}