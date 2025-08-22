import Product from "../../schema/productSchema.js";

// Update a product (merchant-only, must own the product)
export const updateProduct = async (req, res) => {
    const { isMerchant, _id } = req.user;
    const { id } = req.params;
      // Find the product by ID
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ message: "This product does not exist" });
        }
        //must be a merchant and owner of the product
        if (!isMerchant || product.userId.toString() !== _id.toString()) {
            return res.status(403).json({ message: "You are not authorized to do this" });
        }

        // Update the product with fields from request body
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true}
        ).select('-createdAt -updatedAt -userId -_id -__v');
        
        //return success message and the update
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
