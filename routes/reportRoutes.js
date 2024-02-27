const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authController = require("../controllers/authController");

// Fetch reports
router.get("/fetch-reports", reportController.fetchReports);

// Submit report
router.post("/submit-report", reportController.submitReport);

// Edit report (update)
router.put("/edit-report/:id", reportController.editReport);

// Delete report
router.delete("/delete-report/:id", reportController.deleteReport);

// Register Admin
router.post("/register", authController.register);

module.exports = router;
