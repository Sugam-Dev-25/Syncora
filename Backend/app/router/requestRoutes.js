const express = require("express");
const router = express.Router();
const requestController = require("../controller/RequestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send-request", authMiddleware, requestController.sendRequest);
router.post("/accept-request/:id", authMiddleware, requestController.acceptRequest);
router.post("/reject-request/:id", authMiddleware, requestController.rejectRequest);
router.get("/get-requests", authMiddleware, requestController.getRequests);

module.exports = router;
