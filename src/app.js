const express = require('express');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();

// CORS configuration
const LOCAL_IP = '192.168.0.13';
const EXPO_WEB_PORT = 19006;
const EXPO_GO_PORT = 19000;
const DEV_SERVER_PORT = 8081;

const allowedOrigins = [
  `http://localhost:${EXPO_WEB_PORT}`,
  `http://localhost:${EXPO_GO_PORT}`,
  `http://localhost:${DEV_SERVER_PORT}`,
  `http://${LOCAL_IP}:${EXPO_GO_PORT}`,
  `http://${LOCAL_IP}:${EXPO_WEB_PORT}`,
  `http://${LOCAL_IP}:${DEV_SERVER_PORT}`,
  `http://localhost:3000`,
  `http://localhost:3001`,
  `expo://192.168.0.22:${EXPO_GO_PORT}`
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check against allowed origins
    if (allowedOrigins.some(allowedOrigin =>
      origin === allowedOrigin ||
      origin.startsWith(allowedOrigin.replace(/:\d+$/, ':')) // Match any port for localhost
    )) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Added PUT and OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
// Enable CORS for React Native

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/calculator', calculatorRoutes);

// health check rendpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://${LOCAL_IP}:${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
