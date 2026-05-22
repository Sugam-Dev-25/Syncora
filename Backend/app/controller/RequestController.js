const Request = require("../models/Request");
const User = require("../models/User");
const Conversation = require("../models/Conversation");

class RequestController {
  static async sendRequest(req, res) {
    try {
      const { receiverId } = req.body;

      if (receiverId === req.user._id.toString()) {
        return res.status(400).json({
          message: "You cannot send a request to yourself",
        });
      }

      const alreadySentRequest = await Request.findOne({
        sender: req.user._id,
        receiver: receiverId,
      });

      if (alreadySentRequest) {
        return res.status(400).json({
          message: "You have already sent a request to this user",
        });
      }

      const request = await Request.create({
        sender: req.user._id,
        receiver: receiverId,
      });

      res.status(200).json({
        success: true,
        request,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async acceptRequest(req, res) {
    try {
   

      const request = await Request.findById(req.params.id);
      if (!request) {
        return res.status(404).json({
          message: "Request not found",
        });
      }

      request.status = "accepted";
      await request.save();

      await User.findByIdAndUpdate(request.sender, {
        $push: { friends: request.receiver },
      });

      await User.findByIdAndUpdate(request.receiver, {
        $push: { friends: request.sender },
      });

      const conversation = await Conversation.create({
        members: [request.sender, request.receiver],
      });

      res.status(200).json({
        success: true,
        request,
        conversation,
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async rejectRequest(req, res) {
    try {
      const request = await Request.findById(req.params.id);
      if (!request) {
        return res.status(404).json({
          message: "Request not found",
        });
      }

      request.status = "rejected";
      await request.save();

      res.status(200).json({
        success: true,
        request,
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getRequests(req, res) {
    try {
      const requests = await Request.find({ receiver: req.user._id, status: "pending", }).populate("sender", "name email profileImage");
      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

}

module.exports = RequestController;
