const express = require('express');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for React Native
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/calculator', calculatorRoutes);

module.exports = app;
