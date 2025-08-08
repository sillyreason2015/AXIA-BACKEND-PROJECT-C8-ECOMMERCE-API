import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { createOrder, cancelOrder, getUserOrders } from '../controllers/orderApi/orderBarrel.js'


const orderRouter = router()

orderRouter
.post('/create', authMiddleware, createOrder)
.post('/cancel/:orderId', authMiddleware, cancelOrder)
.get('/myorders', authMiddleware, getUserOrders)


export default orderRouter

