const mongoose = require('mongoose');
const { connection_url } = require('../config/keys');


const connectDB = async () => {
    try {
        await mongoose.connect(connection_url)
        console.log('MongoDB Connected successfully ...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;