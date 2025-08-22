import mongoose from 'mongoose'

// Connect to MongoDB
const connectDb = async (req, res) => {
    try{
        // Connect to MongoDB using connection string from environment variables
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