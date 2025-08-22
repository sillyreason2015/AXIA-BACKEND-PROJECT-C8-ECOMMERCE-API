import router from 'express'
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = router(); 

// Import all controller functions from barrels
import { createAdmin } from '../controllers/adminApi/adminBarrel.js'
import { deleteAdmin } from '../controllers/adminApi/adminBarrel.js'
import { updateAdmin } from '../controllers/adminApi/adminBarrel.js'
import { viewUser, viewUsers, deleteUser, getByParams } from '../controllers/adminApi/adminBarrel.js'
import { viewProduct, viewProducts, getProdByParams, deleteProduct } from '../controllers/adminApi/adminBarrel.js'
import { adminLogin } from '../controllers/authApi/adminBarrel.js'
import { adminLogout } from '../controllers/authApi/adminBarrel.js'
import { resetPassword, requestPassword } from '../controllers/adminApi/adminBarrel.js'
import { verifyOtp, resendOtp } from '../controllers/adminApi/adminBarrel.js'
import { getAllOrders } from '../controllers/adminApi/adminBarrel.js'

// Public route: create a new admin
adminRouter.post('/create', createAdmin)

// Public route: admin login
adminRouter.post('/login', adminLogin)

// Protected route: admin logout
adminRouter.post('/logout', adminLogout)

// Protected routes for password management
adminRouter.post('/password/reset', adminAuth, resetPassword)     // Reset admin password
adminRouter.post('/password/reqreset', adminAuth, requestPassword) // Request password reset

// Protected routes for OTP verification
adminRouter.post('/otp/verify', adminAuth, verifyOtp)
adminRouter.post('/otp/resend', adminAuth, resendOtp)

// Protected routes for users management
adminRouter.get('/users', adminAuth, viewUsers)      // View all users
adminRouter.get('/user', adminAuth, getByParams)     // Get user by query parameters
adminRouter.get('/user/:id', adminAuth, viewUser)    // View single user by ID
adminRouter.delete('/deleteuser/:id', adminAuth, deleteUser) // Delete user by ID

// Protected routes for products management
adminRouter.get('/products', adminAuth, viewProducts)        // View all products
adminRouter.get('/product', adminAuth, getProdByParams)      // Get products by query parameters
adminRouter.get('/product/:id', adminAuth, viewProduct)     // View single product by ID
adminRouter.delete('/deleteproduct/:id', adminAuth, deleteProduct)// Delete product by ID

// Protected route for orders
adminRouter.get('/orders', adminAuth, getAllOrders) // View all orders

// Protected routes for admin management
adminRouter.delete('/delete/:id', adminAuth, deleteAdmin)// Delete admin by ID
adminRouter.put('/update/:id', adminAuth, updateAdmin)  // Update admin by ID

export default adminRouter
