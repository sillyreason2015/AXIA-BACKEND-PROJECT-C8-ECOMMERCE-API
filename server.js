import express from 'express'
import dotenv from 'dotenv'
import connectDb from './database/db.js'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRoutes.js'
import otpRouter from './routes/otpRoutes.js'
import passwordRouter from './routes/passwordRoutes.js'
import orderRouter from './routes/orderRoutes.js'
const app = express()

dotenv.config()
const port = process.env.PORT 

connectDb()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/v1', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1/otp', otpRouter)
app.use('/api/v1/password', passwordRouter)
app.use('/api/v1/checkout', orderRouter)

app.listen(port, ()=>{
    console.log(`Our server is up and running on ${port}`)
})
