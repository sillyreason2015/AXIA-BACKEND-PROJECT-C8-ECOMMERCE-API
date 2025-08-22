import router from "express"// Import Express router
import authMiddleware from "../middleware/authMiddleware.js" // Middleware to protect user routes

// Import product-related controller functions
import { viewProduct, viewProducts, viewByCategory } from "../controllers/productApi/productBarrel.js"
import { createProduct } from "../controllers/productApi/productBarrel.js"
import { deleteProduct } from "../controllers/productApi/productBarrel.js"
import { updateProduct } from "../controllers/productApi/productBarrel.js"

const productRouter = router(); 

// Protected route: View all products
productRouter.get('/all', authMiddleware, viewProducts)

// Protected route: View products filtered by category (query params: main, sub, brand)
productRouter.get('/category', authMiddleware, viewByCategory)

// Protected route: View a single product by its ID
productRouter.get('/:id', authMiddleware, viewProduct)

// Protected route: Create a new product (only for merchants)
productRouter.post('/create', authMiddleware, createProduct)

// Protected route: Delete a product by ID (only for the merchant who owns it)
productRouter.delete('/delete/:id', authMiddleware, deleteProduct)

// Protected route: Update a product by ID (only for the merchant who owns it)
productRouter.put('/update/:id', authMiddleware, updateProduct)

export default productRouter
