import mongoose from 'mongoose'


const Schema = mongoose.Schema

const cartItemSchema = new Schema ({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true
    }, 
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    totalItemPrice: {
        type: Number, 
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {_id: false})


const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    products: [cartItemSchema],
    totalCartPrice: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart