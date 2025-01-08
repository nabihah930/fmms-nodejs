import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        // TO-DO: Save constants to config file
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 50, // Adjust pool size based on hardware
        });
        console.log('🟢 Connected to MongoDB 🟢');
    } catch (error) {
        console.error('🔴 Error connecting to MongoDB: ', error);
    }
};

export default connectToDatabase;
