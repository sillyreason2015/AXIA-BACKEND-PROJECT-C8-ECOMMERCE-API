import router from 'express'
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = router()

import { createAdmin } from '../controllers/adminApi/adminBarrel.js'
import { deleteAdmin } from '../controllers/adminApi/adminBarrel.js'
import { updateAdmin } from '../controllers/adminApi/adminBarrel.js'
import { viewUser, viewUsers, deleteUser,getByParams } from '../controllers/adminApi/adminBarrel.js'
import { viewProduct, viewProducts, getProdByParams, deleteProduct } from '../controllers/adminApi/adminBarrel.js'
import { adminLogin } from '../controllers/authApi/adminBarrel.js'
import { adminLogout } from '../controllers/authApi/adminBarrel.js'
import { resetPassword, requestPassword } from '../controllers/adminApi/adminBarrel.js'
import { verifyOtp, resendOtp } from '../controllers/adminApi/adminBarrel.js'



adminRouter
.post('/create', createAdmin)
.post('/login',adminLogin)
.post('/logout',adminLogout)
.post('/password/reset', resetPassword)
.post('/password/reqreset', requestPassword)
.post('/otp/verify', verifyOtp)
.post('/otp/resend', resendOtp)
.get('/users',adminAuth ,viewUsers)
.get('/user',adminAuth ,getByParams)
.get('/products',adminAuth ,viewProducts)
.get('/product',adminAuth ,getProdByParams)
.delete('/delete/:id',adminAuth ,deleteAdmin)
.put('/update/:id',adminAuth ,updateAdmin )
.get('/user/:id',adminAuth ,viewUser)
.delete('/deleteuser/:id',adminAuth ,deleteUser)
.get('/product/:id',adminAuth ,viewProduct)
.delete('/deleteproduct/:id',adminAuth,deleteProduct)


export default adminRouter