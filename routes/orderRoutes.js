import router from 'express'// Import Express router
import authMiddleware from '../middleware/authMiddleware.js' // Middleware to protect user routes
import { createOrder, cancelOrder, getUserOrders } from '../controllers/orderApi/orderBarrel.js' // Import order controllers

const orderRouter = router()

// Protected route: Create a new order based on a cart ID
orderRouter.post('/create/:id', authMiddleware, createOrder)

// Protected route: Cancel an existing order by order ID
orderRouter.post('/cancel/:orderId', authMiddleware, cancelOrder)

// Protected route: Get all orders for the logged-in user
orderRouter.get('/myorders', authMiddleware, getUserOrders)

export default orderRouter
