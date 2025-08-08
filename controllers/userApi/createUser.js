import User from '../../schema/userSchema.js'
import bcrypt from 'bcrypt'
import { sendMail } from '../../utils/sendMail.js'
import dotenv from 'dotenv'


dotenv.config()

export const createUser = async (req, res) => {
    const {username, email, password, age, name } = req.body

   if (!username || !email || !password || !age || !name){
        return res.status(400).json({message: "All Fields are Mandatory"})
   }
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json("This user already exists. Please Log in")
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(Date.now() + 1000 * 60 * 5).toISOString();


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        
        const newUser = new User ({
        ...req.body,
        password: hashedPassword, 
        otp,
        otpExpires,
      })
      
      await newUser.save()

      const mail = {
      mailFrom: process.env.EMAIL_USER,
      mailTo: email,
      subject: 'New User Registration Successful',
      body: `Hi ${username}. Thank you for signing up. Your verification code is ${otp}, and it expires in 5 Minutes.`,
    }
      await sendMail(mail)
      res.status(200).json({message: "New User account created Successfully! Your OTP has been sent to your provided email address"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}