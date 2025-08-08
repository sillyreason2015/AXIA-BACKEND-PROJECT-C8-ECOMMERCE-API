import User from '../../schema/userSchema.js'
import Admin from '../../schema/adminSchema.js'


export const viewUser = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    try{
        if(Admin){
    const user = await User.findById(req.params.id).select('-password -_id -createdAt -updatedAt -__v')
    res.status(200).json(user)
}else{
    res.status(401).json("You are not authorized to access this page")
}
}catch(error){
        return res.status(500).json({message: error.message})
    }
    
}

export const viewUsers = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    try{
        if(Admin){
            const users = await User.find().select('-password -_id -createdAt -updatedAt -__v')
            return res.status(200).json(users)
        }else{
            res.status(401).json({message: "You are not authorized to access this page"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const getByParams = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    const {username, email} = req.query
    const filter = {}
    if(username) filter.username = username
    if(email) filter.email = email
    try{
        const user = await User.find(filter).select('-password -_id -createdAt -updatedAt -__v')
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}



export const deleteUser = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    const {id} = req.params
    if(!Admin){
        return res.status(400).json({message: "You are not authorized to carry out this action"})
    }
    try{
       await User.findByIdAndDelete(id)
       res.status(200).json({message: "User deleted successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
