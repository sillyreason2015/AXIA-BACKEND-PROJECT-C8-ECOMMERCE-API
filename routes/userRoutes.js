import router from 'express'
import { createUser } from '../controllers/userApi/createUser.js'
import { viewUser } from '../controllers/userApi/viewUser.js'
import { updateUser } from '../controllers/userApi/updateUser.js'
import { deleteUser } from '../controllers/userApi/deleteUser.js'
import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = router()

userRouter
.post('/register', createUser)
.get('/user/:id',authMiddleware ,viewUser)
.put('/update/:id',authMiddleware ,updateUser)
.delete('/delete/:id',authMiddleware ,deleteUser)

export default userRouter