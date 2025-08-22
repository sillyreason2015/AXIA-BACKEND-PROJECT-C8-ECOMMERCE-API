import Admin from "../../schema/adminSchema.js";
import bcrypt from 'bcrypt'
import genToken from '../../jwt/gentoken.js'
import { sendMail } from "../../utils/sendMail.js";

//Login admin function
export const adminLogin = async (req, res) => {
    const {email, password} = req.body
    //send a mail to the user upon successful login
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }
     // Validate that both email and password are provided
    if(!email || !password){
        return res.status(400).json({message: "Please enter all fields"})
     }
     try{
        //find the user email. If it does not exist communicate with a user
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({message: "Not Found! Please contact Administrator"})
        }
        //if user is not verified, throw an error
        if(!admin.isVerified){
            return res.status(400).json({message: "User not found"})
        }
        //compare the password from the user to the hashed db password
        const comparePassword = await bcrypt.compare(password, admin.password)
        if(!comparePassword){
            return res.status(400).json({message: "Invalid Login Credentials"})
        }

         // Send login success email
        await sendMail(mail)

        // Generate JWT token with admin ID
        const adminToken = genToken({adminId: admin._id})
        return res
        .cookie('token', adminToken, {httpOnly:true, sameSite: 'strict', secure: false, path: '/'})
        .status(200).json({message: "Administrator Login Successful"})
        
     }catch(error){
        res.status(500).json({message: error.message})
     }
}