import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const genToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "3h"})
}

export default genToken