const express = require("express");
const router = express.Router();
const MessageController = require("../controller/MessageController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/send-message", authMiddleware, upload.single("file"), MessageController.sendMessage);
router.get("/get-messages/:conversationId", authMiddleware, MessageController.getMessages);
router.put("/mark-seen/:id", authMiddleware, MessageController.markSeen);

module.exports = router;