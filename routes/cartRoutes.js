import router from 'express' // Import Express router
import authMiddleware from '../middleware/authMiddleware.js' // Middleware to protect user routes

// Import cart-related controller functions
import { createCart } from '../controllers/cartApi/cartBarrel.js'
import { viewCart } from '../controllers/cartApi/cartBarrel.js'
import { updateCart } from '../controllers/cartApi/cartBarrel.js'
import { deleteCart, deleteCartItem } from '../controllers/cartApi/cartBarrel.js'

const cartRouter = router();  // Create a new router instance

// Protected route: Add a product to cart by product ID
cartRouter.post('/add/:id', authMiddleware, createCart)

// Protected route: View the current user's cart
cartRouter.get('/view', authMiddleware, viewCart)

// Protected route: Update a product in the cart by product ID
cartRouter.put('/update/:id', authMiddleware, updateCart)

// Protected route: Delete the entire cart for the user
cartRouter.delete('/delete', authMiddleware, deleteCart)

// Protected route: Delete a specific product from the cart by product ID
cartRouter.delete('/delete/:id', authMiddleware, deleteCartItem)

export default cartRouter
