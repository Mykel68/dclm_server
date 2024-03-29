const express = require("express");
const router = express.Router();
const reportController = require("../../controllers/super_admin/reportController");

// Fetch reports
router.get("/fetch-reports", reportController.fetchReports);

// Submit report
router.post("/submit-report", reportController.submitReport);

// Edit report (update)
router.get("/edit-report/:id", reportController.editReport);

// Update report
router.put("/update-report/:id", reportController.updateReport);

// Delete report
router.delete("/delete-report/:id", reportController.deleteReport);

// get Report Count
router.get("/getReportCount", reportController.getReportCount);

module.exports = router;
