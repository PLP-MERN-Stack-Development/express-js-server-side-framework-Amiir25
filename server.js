require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError } = require('./errors/customErrors');
const productsRouter = require('./routes/products');


const app = express();
const PORT = process.env.PORT || 3000;


// Built-in JSON body parser (also keep body-parser to satisfy the assignment)
app.use(bodyParser.json());
app.use(express.json());


// Custom logger middleware
app.use(logger);


// Root route
app.get('/', (req, res) => {
res.send('Welcome to the Product API! Go to /api/products to see all products.');
});


// Authentication middleware applied to API routes
app.use('/api', auth);


// Products routes
app.use('/api/products', productsRouter);


// 404 handler for unknown routes
app.use((req, res, next) => {
next(new NotFoundError('Route not found'));
});


// Global error handler
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
