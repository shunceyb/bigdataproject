import mongoose from 'mongoose'
const { MONGODB_URI} = process.env
const  connectDB = async() => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI as string) 
        if (connection.readyState === 1) {
            return Promise.resolve(true);
          }
    } catch {
        console.error(Error);
    return Promise.reject(Error);
    }
}

export default connectDB