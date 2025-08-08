import Product from "../../schema/productSchema.js";

export const updateProduct = async (req, res) => {
    const { isMerchant, _id } = req.user;
    const { id } = req.params;

   
    const protectedFields = ["userId", "createdAt", "updatedAt", "__v", "_id"];
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ message: "This product does not exist" });
        }

        if (!isMerchant || product.userId.toString() !== _id.toString()) {
            return res.status(403).json({ message: "You are not authorized to do this" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true}
        ).select('-createdAt -updatedAt -userId -_id -__v');

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
