import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/flood_management', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully.');
    } catch (error) {
        console.error('🔴 MongoDB connection error:', error.message);
        process.exit(1);
    }
};
