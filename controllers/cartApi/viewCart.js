import Cart from '../../schema/cartSchema.js'

// View the logged-in user's cart
export const viewCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find the cart for this user
    const cart = await Cart.findOne({ userId })

    // Populate product details inside the products array
      .populate('products.productId', '-_id -userId -createdAt -updatedAt -__v')
      .select('-_id -userId -createdAt -updatedAt -__v');

     // If no cart found, return "Cart is empty"
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // Return cart details (with populated product info)
    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
