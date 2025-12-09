import mongoose from 'mongoose';
import config from '../config/env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB error:', error);
});

export default connectDB;
