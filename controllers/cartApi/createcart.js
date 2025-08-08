import Cart from "../../schema/cartSchema.js";
import Product from "../../schema/productSchema.js";

export const createCart = async (req, res) => {
    const {quantity} = req.body || {}
    const {id: productId} = req.params
    const reqUid = req.user._id

    try{
        const product = await Product.findById(productId).select('-_id -createdAt -updatedAt -__v')
        if(!product){
            return res.status(400).json({message: "This product does not exist"})
        }
        let cartItem = await Cart.findOne({userId: reqUid})
        const itemQuantity = quantity || 1
        const totalItemPrice = product.price * itemQuantity
        if(!cartItem){
            const newCart = new Cart({
                ...req.body,
                userId: reqUid,
                products:[{
                    productId: productId,
                    quantity: itemQuantity,
                    totalItemPrice,
                    price: product.price
                }],
                totalCartPrice: totalItemPrice
            })
            await newCart.save()
            res.status(200).json({message: "Product added to cart successfully"})
        }
        const existingItem = cartItem.products.find(item => item.productId.toString() === productId)
        if(existingItem){
            existingItem.quantity += itemQuantity
            existingItem.totalItemPrice = existingItem.quantity * product.price
        }else{
            cartItem.products.push({
                productId: productId,
                quantity: itemQuantity,
                totalItemPrice,
                price: product.price
            })
        }

        cartItem.totalCartPrice = cartItem.products.reduce((sum, item)=>sum + item.totalItemPrice, 0)
        await cartItem.save()
        return res.status(200).json({message: "Product added successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}