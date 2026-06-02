const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", upload.single("profileImage"), authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
