const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

// Route for image upload
router.post("/:userId/image", uploadController.uploadImage);

module.exports = router;
