import jwt from 'jsonwebtoken'
import User from '../schema/userSchema.js'


const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.token
    const jwtSecret = process.env.ACCESS_TOKEN

    if(!accessToken){
        return res.status(401).json({message: "Please Login First"})
    }
    try{
        const decoded = jwt.verify(accessToken, jwtSecret)
        const userId = decoded.userId

        if(!userId){
            return res.status(401).json({message: "Invalid Token"})
        }
        const verifiedUser = await User.findById(userId)
        if(!verifiedUser){
            return res.status(401).json({message: "Invalid User"})
        }
        req.user = verifiedUser
        next()
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export default authMiddleware