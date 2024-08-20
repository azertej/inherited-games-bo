import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('Server is already connected to DB')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'InheritedGamesAdmin',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
    }
}