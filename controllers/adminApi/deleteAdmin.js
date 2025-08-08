import Admin from "../../schema/adminSchema.js";

export const deleteAdmin = async (req, res) => {
    const {id} = req.params
    const {_id} = req.admin
    if(_id.toString() !== id){
        return res.status(400).json({message: "You are not authorized to carry out this action"})
    }
    try{
        const admin = await Admin.findByIdAndDelete(id)
        if(admin){
            return res.status(200).json({message: "User deleted Successfully"})
        }
        }catch(error){
    res.status(500).json({message: error.message})
    }
}