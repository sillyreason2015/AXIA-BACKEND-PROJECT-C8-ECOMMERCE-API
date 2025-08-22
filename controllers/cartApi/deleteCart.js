import Cart from "../../schema/cartSchema.js";


// Delete a single product from the user's cart
export const deleteCartItem = async (req, res) => {
    const productId = req.params.id
    const userId = req.user._id

    try{
         // Find the user's cart and remove the product with matching productId
        const cart = await Cart.findOneAndUpdate(
            {userId}, 
            {$pull: {products: {productId}}},
            {new: true}
        )
        // If no cart found, return error
        if(!cart){
            return res.status(404).json({message: "No items found in cart"})
        }
          // Recalculate total cart price after removal
        cart.totalCartPrice = cart.products.reduce(
            (sum, item) => sum + item.totalItemPrice, 0
        )
        // Save updated cart
        await cart.save()
        res.status(200).json({message: "Item removed from cart successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const deleteCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.user._id})
        if(!cart){
            return res.status(400).json({message: "There are no items in cart. Add on to start shopping now"})
        }
        cart.products = []
        cart.totalCartPrice = 0
        await cart.save()
        res.status(200).json({message: "Cart deleted Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}