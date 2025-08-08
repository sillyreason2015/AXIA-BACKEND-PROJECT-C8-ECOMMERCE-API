import router from "express";
import authMiddleware from "../middleware/authMiddleware.js";


import { viewProduct, viewProducts, viewByCategory} from "../controllers/productApi/productBarrel.js";
import { createProduct } from "../controllers/productApi/productBarrel.js";
import { deleteProduct } from "../controllers/productApi/productBarrel.js";
import { updateProduct } from "../controllers/productApi/productBarrel.js";

const productRouter = router()


productRouter
.get('/all', authMiddleware,viewProducts)
.get('/category',authMiddleware, viewByCategory)
.get('/:id', authMiddleware,viewProduct)
.post('/create',authMiddleware ,createProduct)
.delete('/delete/:id',authMiddleware ,deleteProduct)
.put('/update/:id',authMiddleware ,updateProduct)


export default productRouter

