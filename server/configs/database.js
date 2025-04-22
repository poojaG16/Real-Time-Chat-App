const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/chatapp';

mongoose.connect(mongoURL);

const connectDB = mongoose.connection;

connectDB.on('connected', () => {
    console.log('MongoDB connected successfully');
});

connectDB.on('error', (error) => {
    console.log('MongoDB connection error:', error.message);
});

connectDB.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = connectDB;