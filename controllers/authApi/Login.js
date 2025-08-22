import User from '../../schema/userSchema.js'
import bcrypt from 'bcrypt'
import genToken from '../../jwt/gentoken.js'
import { sendMail } from '../../utils/sendMail.js'


// User login function
export const loginUser = async (req, res) => {
    const {email, password} = req.body
   // Email notification object for successful login
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }
   // Validate input fields
    if(!email || !password){
        return res.status(400).json({message: "Email and Password Required"})
    }
    
    try{
        //find if the user already exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "This user does not exist. Please Register to continue"})
        }
        // Ensure user is verified before login
        if(!user.isVerified){
          return res.status(400).json({message: "Please Verify OTP before login"})
        }
         // Compare input password with hashed password in DB
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({message: "Invalid login credentials"})
        }
       
        await sendMail(mail)
        //generate jwt token with userId
        const token = genToken({userId: user._id})

        // Set cookie with token and return success response
        return res
        .cookie('token', token, {httpOnly: true, sameSite:'strict', secure: false, path: '/'})
        .status(200).json({message: "Login Successful"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}