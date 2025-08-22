import User from '../../schema/userSchema.js'

// Delete a user account
export const deleteUser = async (req, res) => {
    const {id} = req.params
    const{_id} = req.user

    
    // Ensure the logged-in user is deleting their own account
    if(_id.toString() !== id ){
        return res.status(403).json({message: "You are not authorized to carry out this action"})
    }

     try{
         // Delete the user by ID
       await User.findByIdAndDelete(id)
        res.status(200).json({message: "User Deleted Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}