const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const ConversationController = require("../controller/ConversationController");

router.get("/my-conversations",authMiddleware,ConversationController.getMyConversations);

module.exports = router;