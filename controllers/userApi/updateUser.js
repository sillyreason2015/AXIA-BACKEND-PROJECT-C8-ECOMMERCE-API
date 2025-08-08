import User from "../../schema/userSchema.js";
import bcrypt from 'bcrypt'

export const updateUser = async (req, res) => {
    const {id} = req.params
    const {_id} = req.user
    if(_id.toString() !== id){
        return res.status(403).json({message: "You are not authorized to view this page"})
    }
        try{
            const update = {
                ...req.body
            }

            if(update.password){
                const salt = await bcrypt.genSalt(10)
                update.password = await bcrypt.hash(update.password, salt)
            }
            const user = await User.findByIdAndUpdate(id, update, {new: true}, {runValidators: true}).select('-password -_id -createdAt -updatedAt -__v')
            if(!user){
                return res.status(404).json({message: "User not Found"})
            }
            res.status(200).json({message: "User updated Successfully"})
        }catch(error){
            res.status(500).json({message: error.message})
        }
}