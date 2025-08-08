import Cart from '../../schema/cartSchema.js'
import Product from '../../schema/productSchema.js'

export const updateCart = async (req, res) => {
    const { id: productId } = req.params; 
    const { quantity } = req.body;
    const userId = req.user._id;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Quantity must not be less than 1" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "This product does not exist" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

 
        const cartItem = cart.products.find(
            (item) => item.productId.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({ message: "Item not in cart. Please add it first." });
        }
        cartItem.quantity = quantity;
        cartItem.totalItemPrice = quantity * product.price;


        cart.totalCartPrice = cart.products.reduce(
            (sum, item) => sum + item.totalItemPrice,
            0
        );

        await cart.save();

        return res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
