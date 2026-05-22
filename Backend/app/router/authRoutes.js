const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("profileImage"), authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
