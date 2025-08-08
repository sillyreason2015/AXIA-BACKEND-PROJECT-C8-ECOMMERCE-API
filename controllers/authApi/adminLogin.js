import Admin from "../../schema/adminSchema.js";
import bcrypt from 'bcrypt'
import genToken from '../../jwt/gentoken.js'
import { sendMail } from "../../utils/sendMail.js";

export const adminLogin = async (req, res) => {
    const {email, password} = req.body
    
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }
    
    if(!email || !password){
        return res.status(400).json({message: "Please enter all fields"})
     }
     try{
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({message: "Not Found! Please contact Administrator"})
        }
        if(!admin.isVerified){
            return res.status(400).json({message: "Administrator not found"})
        }
        const comparePassword = await bcrypt.compare(password, admin.password)
        if(!comparePassword){
            return res.status(400).json({message: "Invalod Login Credentials"})
        }

        await sendMail(mail)
        const adminToken = genToken({adminId: admin._id})
        return res
        .cookie('token', adminToken, {httpOnly:true, sameSite: 'strict', secure: false, path: '/'})
        .status(200).json({message: "Administrator Login Successful"})
     }catch(error){
        res.status(500).json({message: error.message})
     }
}