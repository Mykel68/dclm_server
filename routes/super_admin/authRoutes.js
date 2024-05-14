const express = require("express");
const authController = require("../../controllers/super_admin/authController");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getAllAdmin", authController.getAllAdmin);
router.get("/getAdminCount", authController.getAdminCount);
router.get("/profile/:id", authController.Profile);

module.exports = router;
