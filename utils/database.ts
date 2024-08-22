import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('Server is already connected to DB')
        return;
    }
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error('MONGODB_URL environment variable is not defined');
    }
    try {
        await mongoose.connect(mongoUrl, {
            dbName: 'InheritedGamesAdmin',
        })
        isConnected = true
        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
    }
}