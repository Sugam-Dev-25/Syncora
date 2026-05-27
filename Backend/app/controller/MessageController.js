const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
class MessageController {
  static async sendMessage(req, res) {
    try {
      const { conversationId, text } = req.body;

      let fileUrl = "";
      let fileType = "";

      if (req.file) {
        const streamUpload = (req) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "syncora-chat-files",
              },

              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              },
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        };

        const result = await streamUpload(req);

        fileUrl = result.secure_url;

        fileType = req.file.mimetype;
      }

      const message = await Message.create({
        conversationId,

        sender: req.user._id,

        text,

        file: fileUrl,

        fileType,
      });

      res.status(200).json({
        success: true,

        message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        error: error.message,
      });
    }
  }

  static async getMessages(req, res) {
    try {
      const { conversationId } = req.params;

      const messages = await Message.find({
        conversationId,
      })
        .populate("sender", "name email profileImage")
        .sort({ createdAt: 1 });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async markSeen(req, res) {
    try {
      const message = await Message.findByIdAndUpdate(
        req.params.id,
        { seen: true },
        { new: true },
      );
      res.status(200).json({
        success: true,
        message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = MessageController;
