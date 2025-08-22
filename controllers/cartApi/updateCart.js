import Cart from '../../schema/cartSchema.js'
import Product from '../../schema/productSchema.js'


// Update quantity of a product inside the user's cart
export const updateCart = async (req, res) => {
    const { id: productId } = req.params; 
    const { quantity } = req.body;
    const userId = req.user._id;

     // Validate quantity (must be provided and at least 1)
    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Quantity must not be less than 1" });
    }

    try {
        // Check if product exists in DB
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "This product does not exist" });
        }

         // Find user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the specific product inside the cart
        const cartItem = cart.products.find(
            (item) => item.productId.toString() === productId
        );
        // If product not in cart, reject update
        if (!cartItem) {
            return res.status(404).json({ message: "Item not in cart. Please add it first." });
        }
        // Update quantity and total price for that product
        cartItem.quantity = quantity;
        cartItem.totalItemPrice = quantity * product.price;

        // Recalculate the total cart price
        cart.totalCartPrice = cart.products.reduce(
            (sum, item) => sum + item.totalItemPrice,
            0
        );

        // Save updated cart
        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
