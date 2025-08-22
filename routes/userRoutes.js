import router from 'express';  // Import Express router
import { createUser } from '../controllers/userApi/createUser.js' // Controller to register new user
import { viewUser } from '../controllers/userApi/viewUser.js'    // Controller to view a user
import { updateUser } from '../controllers/userApi/updateUser.js' // Controller to update a user
import { deleteUser } from '../controllers/userApi/deleteUser.js'// Controller to delete a user
import authMiddleware from '../middleware/authMiddleware.js'    // Middleware to protect routes

const userRouter = router()

// Public route: Register a new user
userRouter.post('/register', createUser)

// Protected route: View a user by ID
userRouter.get('/user/:id', authMiddleware, viewUser)

// Protected route: Update a user by ID
userRouter.put('/update/:id', authMiddleware, updateUser)

// Protected route: Delete a user by ID
userRouter.delete('/delete/:id', authMiddleware, deleteUser)

export default userRouter
