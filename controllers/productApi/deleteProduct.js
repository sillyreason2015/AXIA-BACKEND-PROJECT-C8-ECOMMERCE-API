import Product from "../../schema/productSchema.js";


export const deleteProduct = async (req, res) => {
    const {isMerchant, _id} = req.user
    const {id} = req.params
    try{
        const product = await Product.findById(id)
        if(!product ){
            return res.status(404).json({message: "Product not found"})
        }
        if(!isMerchant || product.userId.toString() !== _id.toString()){
            return res.status(403).json({message: "You are not authorized to access this page"})
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product deleted successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}