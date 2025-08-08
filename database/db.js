import mongoose from 'mongoose'
const connectDb = async (req, res) => {
    try{
        await mongoose.connect(process.env.MONGODB_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        console.log("Connected to MongoDb")
    }catch(error){
       console.log("Error connecting to MongoDb", error)
    }
}

export default connectDb