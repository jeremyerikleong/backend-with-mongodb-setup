import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

async function startServer() {
    try {
        await connectDB();
        app.on('error', (err) => {
            console.error(`Error: ${err}`);
            throw err;
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.error(`MongoDB connection failed: ${err}`);
    }
}

startServer();