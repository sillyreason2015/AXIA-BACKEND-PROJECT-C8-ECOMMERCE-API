import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema= new Schema({
username: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
name: {
    type: String,
    required: true
},
age: {
    type: String,
    required: true
},
isMerchant:{
    type: Boolean,
    default: false
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

const User = mongoose.model("User", userSchema )

export default User
