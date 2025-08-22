import Product from "../../schema/productSchema.js";

// Delete a product (merchant-only, must own the product)
export const deleteProduct = async (req, res) => {
    const {isMerchant, _id} = req.user
    const {id} = req.params
    try{
        // Find the product by ID
        const product = await Product.findById(id)

           // If product doesn't exist, return 404
        if(!product ){
            return res.status(404).json({message: "Product not found"})
        }
        //must be a merchant and own the product
        if(!isMerchant || product.userId.toString() !== _id.toString()){
            return res.status(403).json({message: "You are not authorized to access this page"})
        }
         // Delete the product
        await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product deleted successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}