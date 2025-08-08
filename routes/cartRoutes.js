import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { createCart,  } from '../controllers/cartApi/cartBarrel.js'
import { viewCart } from '../controllers/cartApi/cartBarrel.js'
import { updateCart } from '../controllers/cartApi/cartBarrel.js'
import { deleteCart, deleteCartItem } from '../controllers/cartApi/cartBarrel.js'


const cartRouter = router()

cartRouter
.post('/add/:id',authMiddleware ,createCart)
.get('/view',authMiddleware ,viewCart)
.put('/update/:id',authMiddleware ,updateCart)
.delete('/delete',authMiddleware ,deleteCart)
.delete('/delete/:id',authMiddleware ,deleteCartItem)



export default cartRouter