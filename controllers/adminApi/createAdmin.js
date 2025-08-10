import Admin from "../../schema/adminSchema.js";
import bcrypt from 'bcrypt'
import { sendMail } from "../../utils/sendMail.js";
export const createAdmin = async (req, res) => {
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
  
    const {name,email, password } = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: "Please All Fields are mandatory"})
    }    
try{
    const admin = await Admin.findOne({email})
        if(admin){
            return res.status(400).json({message: "This user already exists"})
        }
        
        
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = String(new Date(Date.now() + 1000 * 60 * 5)); 

        
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newAdmin = new Admin({
            ...req.body,
           password:hashedPassword,
           otp,
           otpExpires
        })
        await newAdmin.save()
    const mail = {
      mailFrom: process.env.EMAIL_USER,
      mailTo: email,
      subject: 'New User Registration Successful',
      body: `Hi ${name}. Thank you for signing up. Your verification code is ${otp}, and it expires in 5 Minutes.`,
    };
        await sendMail(mail)
        res.status(200).json({message: "Administrator account created Successfully. Please proceed to verify OTP"})
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }
