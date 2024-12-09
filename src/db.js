import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        // TO-DO: Save constants to config file
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://db_admin:admin@masters.yst0b.mongodb.net/flood_management_sys?retryWrites=true&w=majority&appName=Masters';
        await mongoose.connect(mongoURI);
        console.log('🟢 Connected to MongoDB 🟢');
    } catch (error) {
        console.error('🔴 Error connecting to MongoDB: ', error);
    }
};

export default connectToDatabase;
