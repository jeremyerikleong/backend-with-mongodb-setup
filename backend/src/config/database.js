import mongoose from 'mongoose';

export async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);

        if (connectionInstance) {
            console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
        }
    } catch (err) {
        console.error(`MongoDB connection failed: ${err}`);
        process.exit(1);
    }
}