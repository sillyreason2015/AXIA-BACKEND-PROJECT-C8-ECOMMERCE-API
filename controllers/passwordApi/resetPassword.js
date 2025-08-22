import User from "../../schema/userSchema.js"
import bcrypt from 'bcrypt'

// Reset user's password using a valid token
export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body

    try{
         // Find user with matching token and ensure token has not expired
        const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})

        // If no valid user found, return error
        if (!user){
            return res.status(400).json({message: "Password Reset token is Invalid/ Expired"})
        }
        // Hash the new password and update user document
        user.password = bcrypt.hashSync(newPassword, 10)

         // Clear the reset token and its expiration time
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        // Save updated user document
        await user.save()
        return res.status(200).json({messsage: "Password Reset Successfully! Please Proceed to login"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}