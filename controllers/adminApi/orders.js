import Order from "../../schema/orderSchema.js";

export const getAllOrders = async (req, res) => {
  const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).populate('products.productId userId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};