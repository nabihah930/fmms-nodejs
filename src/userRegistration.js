import mongoose from 'mongoose';

const userRegistrationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

export const UserRegistration = mongoose.model('UserRegistration', userRegistrationSchema);
