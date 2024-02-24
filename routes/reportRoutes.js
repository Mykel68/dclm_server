const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Fetch reports
router.get('/fetch-reports', reportController.fetchReports);

// Submit report
router.post('/submit-report', reportController.submitReport);

module.exports = router;
