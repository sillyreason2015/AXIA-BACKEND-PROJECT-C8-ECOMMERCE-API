import User from '../../schema/userSchema.js'
import { sendMail } from '../../utils/sendMail.js'
import crypto from 'crypto'


// Handle password reset request
export const requestPassword = async (req, res) => {
    const {email} = req.body
    try{
        // Find the user by email
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found. Please Register first to continue"})
        }
         // Generate a secure random token for password reset
        const token = crypto.randomBytes(32).toString('hex')

        // Store token and expiration time (30 minutes from now) in user document
        user.passwordResetToken = token 
        user.passwordResetExpires = Date.now() + 30 * 60 * 1000
        await user.save()

         // Send password reset email
        await sendMail ({
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "Password Reset",
            body:`
            Hello ${user.username}, you recently made a new password request. 
            <p>Click on the link to reset your password</p> 
            <a href = "http://localhost:4000/password/reset/${token}">Reset Password</a>`
        })
        // Return success response
        res.status(200).json({message: "Password Reset request sent Successfully"})
    }catch(error){
        console.log(error)
    }
}