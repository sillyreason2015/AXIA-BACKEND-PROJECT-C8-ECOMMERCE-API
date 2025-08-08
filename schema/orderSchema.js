import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
        
        quantity: {type: Number, required: true},
        price: { type: Number, required: true },
        totalItemPrice: { type: Number, required: true },
    },
],
totalPrice: {
    type: Number,
    required: true
},
status: {
    type: String,
    enum: ["Pending", "Cancelled", "Completed"],
    default: "Pending"
},
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)
export default Order