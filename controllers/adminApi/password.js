import Admin from "../../schema/adminSchema.js"
import bcrypt from 'bcrypt'
import { sendMail } from '../../utils/sendMail.js'
import crypto from 'crypto'

export const requestPassword = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    const {email} = req.body
    try{
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({message: "Administrator account not found. Please contact admin to continue"})
        }
        const token = crypto.randomBytes(32).toString('hex')
        admin.passwordResetToken = token 
        admin.passwordResetExpires = Date.now() + 30 * 60 * 1000
        await admin.save()

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


export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    try{
        const admin = await Admin.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
        if (!admin){
            return res.status(400).json({message: "Password Reset token is Invalid/ Expired"})
        }
        admin.password = bcrypt.hashSync(newPassword, 10)
        admin.passwordResetToken = undefined
        admin.passwordResetExpires = undefined
        await admin.save()
        return res.status(200).json({messsage: "Password Reset Successfully! Please Proceed to login"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}



