import Order from "../../schema/orderSchema.js";

// Fetch all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
  // Find all orders for this user and populate product details
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate('products.productId');
     // Return the list of orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};