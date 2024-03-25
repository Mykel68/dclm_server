const express = require("express");
const reportController = require("../../controllers/admin/reportController");
const router = express.Router();

router.get("/getReportCount/:section", reportController.getReportCount);
router.get("/getReport/:section", reportController.getReport);
router.get("/editReport/:id", reportController.editReport);

module.exports = router;
