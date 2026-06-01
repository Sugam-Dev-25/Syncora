const Conversation = require("../models/Conversation");

const Message = require("../models/Message");

class ConversationController {

  static async getMyConversations(req, res) {

    try {

      const conversations = await Conversation.find({
        member: req.user._id,
      }).populate(
        "member",
        "name email profileImage online"
      );

      const users = await Promise.all(

        conversations.map(async (conversation) => {

          const user = conversation.member.find(
            (member) =>
              member._id.toString() !==
              req.user._id.toString()
          );

          // LAST MESSAGE

          const lastMessage = await Message.findOne({
            conversationId: conversation._id,
          })
            .sort({ createdAt: -1 });

          return {

            ...user._doc,

            conversationId: conversation._id,

            lastMessage:
              lastMessage?.text ||
              "Tap to start chatting...",

          };

        })

      );

      res.status(200).json({
        success: true,
        users,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }

  }

}

module.exports = ConversationController;