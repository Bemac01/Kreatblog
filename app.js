const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./init/db');
const { port } = require('./config/keys');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/v1/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
}
);  