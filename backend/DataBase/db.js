const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};

module.exports = connectDB;

