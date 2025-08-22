import Cart from "../../schema/cartSchema.js";
import Product from "../../schema/productSchema.js";

// Create or update a cart for the logged-in user
export const createCart = async (req, res) => {
    const {quantity} = req.body // Get quantity from request body
    const {id: productId} = req.params
    const reqUid = req.user._id

    try{
        // Check if product exists
        const product = await Product.findById(productId).select('-_id -createdAt -updatedAt -__v')
        if(!product){
            return res.status(400).json({message: "This product does not exist"})
        }
         // Find existing cart for this user
        let cartItem = await Cart.findOne({userId: reqUid})
        // If no quantity is provided, default to 1
        const itemQuantity = quantity || 1
         // Calculate price for this item (price * quantity)
        const totalItemPrice = product.price * itemQuantity

        // If user has no cart yet, create a new one
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
              // Save new cart and return success response
            await newCart.save()
            res.status(200).json({message: "Product added to cart successfully"})
        }
        // If cart already exists, check if this product is already in it
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
        // Recalculate total cart price (sum of all product totals)
        cartItem.totalCartPrice = cartItem.products.reduce((sum, item)=>sum + item.totalItemPrice, 0)

        // Save updated cart and return success response
        await cartItem.save()
        return res.status(200).json({message: "Product added successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}