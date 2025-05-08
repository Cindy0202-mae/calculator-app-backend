const express = require('express');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();

// CORS configuration
const LOCAL_IP = '192.168.28.199';
const EXPO_WEB_PORT = 19006;
const EXPO_GO_PORT = 19000;

// Middleware
app.use(cors({
  origin: [
    `http://localhost:${EXPO_WEB_PORT}`,
    `http://${LOCAL_IP}:${EXPO_GO_PORT}`,
    `http://${LOCAL_IP}:${EXPO_WEB_PORT}`, // Expo Go
  ],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})); // Enable CORS for React Native

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/calculator', calculatorRoutes);

// health check rendpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://${LOCAL_IP}:${PORT}`);
  console.log(`Server running on http://localhost:${LOCAL_IP}:${EXPO_GO_PORT}`);
});
