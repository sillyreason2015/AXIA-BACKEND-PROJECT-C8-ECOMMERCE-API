import Admin from "../../schema/adminSchema.js";
import bcrypt from 'bcrypt'
export const updateAdmin = async (req, res) => {
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    const {id} = req.params
    const{_id} = req.admin
        if(_id.toString() !== id){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
        
        try{
           const adminUpdate = {
            ...req.body,
           }
           
           if(adminUpdate.password){
            const salt = await bcrypt.genSalt(10)
            adminUpdate.password = await bcrypt.hash(adminUpdate.password, salt)
           }
           const admin = await Admin.findByIdAndUpdate(id, adminUpdate, {new: true, runValidators: true})
           
           if(!admin){
            return res.status(404).json({message: "Administrator Does not exist"})
           }

           res.status(200).json({message: "User updated successfully"})
        }catch(error){
        return res.status(500).json({message: error.message})
    }
}