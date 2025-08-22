import User from '../../schema/userSchema.js'
import Admin from '../../schema/adminSchema.js'

//view a single user
export const viewUser = async (req, res) => {
    // function to check if the request has a valid admin secret key.
     const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
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

//View all users
export const viewUsers = async (req, res) => {
    // function to check if the request has a valid admin secret key.
     const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
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

//view user by params
export const getByParams = async (req, res) => {
    // function to check if the request has a valid admin secret key.
     const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
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


//delete a user
export const deleteUser = async (req, res) => {
    // function to check if the request has a valid admin secret key.
     const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
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
