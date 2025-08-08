import Cart from '../../schema/cartSchema.js'

export const viewCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate('products.productId', '-_id -userId -createdAt -updatedAt -__v')
      .select('-_id -userId -createdAt -updatedAt -__v');

    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
