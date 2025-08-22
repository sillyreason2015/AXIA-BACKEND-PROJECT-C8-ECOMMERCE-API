import Admin from "../../schema/adminSchema.js"
import bcrypt from 'bcrypt'
import { sendMail } from '../../utils/sendMail.js'
import crypto from 'crypto'

// Request password reset
export const requestPassword = async (req, res) => {
     // Check for the admin secret key in headers for security
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    const {email} = req.body

    try{
        // Find the admin by email
        const admin = await Admin.findOne({email})
        // Return error if the admin does not exist
        if(!admin){
            return res.status(400).json({message: "Administrator account not found. Please contact admin to continue"})
        }

         // Generate a secure random token for password reset
        const token = crypto.randomBytes(32).toString('hex')

        // Store token and expiry in the database
        admin.passwordResetToken = token 
        admin.passwordResetExpires = Date.now() + 30 * 60 * 1000
        await admin.save()

         // Send email containing the reset link
        await sendMail ({
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "Password Reset",
            body:`
            Hello ${admin.name}, you recently made a new password request. 
            <p>Click on the link to reset your password</p> 
            <a href = "http://localhost:4000/api/v1/admin/password/reset/${token}">Reset Password</a>`
        })
        res.status(200).json({message: "Password Reset request sent Successfully"})
    }catch(error){
        console.log(error)
    }
}

// reset password
export const resetPassword = async (req, res) => {
    // Check for admin secret key in headers for extra security
    const {token, newPassword} = req.body
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    try{
         // Look for admin with matching token that hasn't expired
        const admin = await Admin.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
        
         // If token is invalid or expired, return early
        if (!admin){
            return res.status(400).json({message: "Password Reset token is Invalid/ Expired"})
        }

        // Remove token and expiry to prevent reuse
        admin.password = bcrypt.hashSync(newPassword, 10)
        admin.passwordResetToken = undefined
        admin.passwordResetExpires = undefined

        
        await admin.save()
        return res.status(200).json({messsage: "Password Reset Successfully! Please Proceed to login"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}



