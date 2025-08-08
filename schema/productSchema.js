import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productSchema = new Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    colour:{
        type: String,
        required: true
    }, 
    size: {
        type: String,
        required: true
    }, 
    categories: {
       main: {type: String, required: true},
       sub: {type: String},
       brand: {type: String}
    }
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product;