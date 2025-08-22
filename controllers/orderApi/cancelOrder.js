import Order from "../../schema/orderSchema.js";

// Cancel an order for the logged-in user
export const cancelOrder = async (req, res) => {
    try{
        const {orderId} = req.params
        const userId = req.user._id
        
        // Find the order by ID
        const order = await Order.findById(orderId)
        if(!order){
            return res.status(404).json({message: "Order not found. Start Shopping today!"})
        }
        // Ensure the order belongs to the logged-in user
        if(order.userId.toString() !== userId.toString()){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
        // Prevent cancelling an order that's already cancelled
        if(order.status === "Cancelled"){
            return res.status(400).json({message: "Order already cancelled"})
        }
        // Update order status to "Cancelled"
        order.status =  "Cancelled"
        await order.save()
        res.status(200).json({message: "Order cancelled successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}