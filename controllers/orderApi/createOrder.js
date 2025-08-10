import Order from "../../schema/orderSchema.js";
import Cart from "../../schema/cartSchema.js";
import User from "../../schema/userSchema.js";
import { sendMail } from "../../utils/sendMail.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: cartId } = req.params; 

    const cart = await Cart.findById(cartId).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    }
    if (cart.products.length === 0) {
      return res.status(400).json({
        message: "No items in Cart. Please add one to place an order now",
      });
    }

    const merchantIds = new Set();
    cart.products.forEach((item) => {
      if (item.productId?.userId) {
        merchantIds.add(item.productId.userId.toString());
      }
    });

    const newOrder = new Order({
      userId,
      cartId,
      products: cart.products.map((item) => ({
        productId: item.productId._id, 
        quantity: item.quantity,
        price: item.price,
        totalItemPrice: item.totalItemPrice,
      })),
      totalPrice: cart.totalCartPrice,
      status: "Pending",
    });

    await newOrder.save();

    const user = await User.findById(userId);
    await sendMail({
      mailFrom: process.env.EMAIL_USER,
      mailTo: user.email,
      subject: "Order Confirmation",
      body: `Hi ${user.username}, your order (ID: ${newOrder._id}) has been placed successfully. Thanks for shopping with us!`,
    });

    for (const merchantId of merchantIds) {
      const merchant = await User.findById(merchantId);
      if (merchant?.isMerchant) {
        await sendMail({
          mailFrom: process.env.EMAIL_USER,
          mailTo: merchant.email,
          subject: "New Order Received",
          body: `You have received a new order containing your product(s). Please check your dashboard.`,
        });
      }
    }

    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();
    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
