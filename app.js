const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const connectDB = require('./init/db');
const { port } = require('./config/keys');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const notFoundController = require('./controllers/notFound');
const { registerValidation } = require('./validators/auth');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(errorHandler);

// Routes
app.use('/api/v1/auth', authRoutes); 

//not found route
app.use(RegExp('/*/'), notFoundController);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});  