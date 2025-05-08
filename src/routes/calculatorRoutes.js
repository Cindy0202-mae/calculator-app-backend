const express = require('express');
const router = express.Router();

const {
  calculate,
  getHistory,
  deleteHistoryItem
} = require('../controllers/calculatorController');


// POST /api/calculate
router.post('/calculate', calculate);

// GET /api/history
router.get('/history', getHistory);

// DELETE /api/history/:id
router.delete('/history/:id', deleteHistoryItem);

module.exports = router;
// This code defines the routes for the calculator API.
// It includes routes for calculating results, fetching history, and deleting history items.
// The routes are defined using Express Router and are linked to the respective controller functions.
// The router is then exported for use in the main application file.
