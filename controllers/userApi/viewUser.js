import User from '../../schema/userSchema.js'


export const viewUser = async (req, res) => {
   const {id} = req.params
   const{_id} = req.user._id
        if(_id.toString() !== id){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
    try{
    const user = await User.findById(req.params.id).select('-password -_id -updatedAt -createdAt -__v')
    res.status(200).json(user)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    
}