import express from 'express';              // Import Express framework
import dotenv from 'dotenv';                // Import dotenv to handle environment variables
import cors from 'cors'                     //Import cors for cross origin support
import connectDb from './database/db.js';   // Database connection function
import userRouter from './routes/userRoutes.js';       // User-related routes
import adminRouter from './routes/adminRoutes.js';     // Admin-related routes
import productRouter from './routes/productRoutes.js'; // Product-related routes
import cartRouter from './routes/cartRoutes.js';       // Cart-related routes
import cookieParser from 'cookie-parser';  // Middleware to parse cookies
import authRouter from './routes/authRoutes.js';       // Auth routes (login/logout)
import otpRouter from './routes/otpRoutes.js';         // OTP routes
import passwordRouter from './routes/passwordRoutes.js'; // Password reset routes
import orderRouter from './routes/orderRoutes.js';     // Order routes

const app = express();  // Initialize Express app

dotenv.config();        // Load environment variables
const port = process.env.PORT;  // Port number from environment

connectDb();  // Connect to MongoDB

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Parse cookies in incoming requests
app.use(cors())

// Routes
app.use('/api/v1', userRouter);          // User-related routes
app.use('/api/v1/admin', adminRouter);   // Admin routes
app.use('/api/v1/product', productRouter); // Product routes
app.use('/api/v1/cart', cartRouter);     // Cart routes
app.use('/api/v1', authRouter);          // Auth routes
app.use('/api/v1/otp', otpRouter);       // OTP routes
app.use('/api/v1/password', passwordRouter); // Password reset routes
app.use('/api/v1/checkout', orderRouter);    // Order routes

// Start the server
app.listen(port, () => {
    console.log(`Our server is up and running on ${port}`);
});
