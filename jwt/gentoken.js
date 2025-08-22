import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()


// Generate a JWT token with a payload
const genToken = (payload)=>{
    // Sign the JWT using the secret from environment variables
    // Token expires in 3 hours
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "3h"})
}

export default genToken