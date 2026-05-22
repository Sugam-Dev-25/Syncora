const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, userController.getMyProfile);

router.put("/profile-update", authMiddleware, upload.single("profileImage"), userController.updateProfile);

router.get("/search", authMiddleware, userController.searchUsers);

router.get("/:id", authMiddleware, userController.getSingleUser);

module.exports = router;

