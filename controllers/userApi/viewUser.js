import User from '../../schema/userSchema.js'

// View a user's own account details
export const viewUser = async (req, res) => {
   const {id} = req.params
   const{_id} = req.user._id
   // Ensure the logged-in user is only viewing their own account
        if(_id.toString() !== id){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
    try{
        // Find the user by ID and exclude sensitive/internal fields
    const user = await User.findById(req.params.id).select('-password -_id -updatedAt -createdAt -__v')
    //return user details
    res.status(200).json(user)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    
}