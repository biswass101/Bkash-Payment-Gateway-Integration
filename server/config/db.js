const mongoose = require('mongoose');
const config = require('./config')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.db);
        console.log(`MongoDb connnected to: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = connectDB;