import Order from "../../schema/orderSchema.js";

export const getAllOrders = async (req, res) => {
  // Check for secret key in headers to authorize access
  const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    try {
      // Get status from query parameters to filter orders (optional)
    const { status } = req.query;
    const filter = status ? { status } : {};

     // Populate user and product details for each order
    const orders = await Order.find(filter).populate('products.productId userId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};