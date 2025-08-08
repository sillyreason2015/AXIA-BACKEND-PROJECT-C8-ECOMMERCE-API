import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
otp: String,
otpExpires: Date,
isVerified: {
    type: Boolean,
    default: false,
},
lastOtpSentAt: Date,
passwordResetToken: String,
passwordResetExpires: Date
}, {timestamps: true})

const Admin = mongoose.model("Admin", adminSchema)
export default Admin