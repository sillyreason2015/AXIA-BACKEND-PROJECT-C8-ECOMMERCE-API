import jwt from 'jsonwebtoken'
import Admin from '../schema/adminSchema.js'


const adminAuth = async (req, res, next) => {
    const accessToken = req.cookies.token
    const jwtSecret = process.env.ACCESS_TOKEN

    if(!accessToken){
        return res.status(401).json({message: "Please Login First"})
    }
    try{
        const decoded = jwt.verify(accessToken, jwtSecret)
        const adminId = decoded.adminId

        if(!adminId){
            return res.status(401).json({message: "Invalid Token"})
        }
        const verifiedAdmin = await Admin.findById(adminId)
        if(!verifiedAdmin){
            return res.status(401).json({message: "Invalid Id"})
        }
        req.admin = verifiedAdmin
        next()
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

export default adminAuth