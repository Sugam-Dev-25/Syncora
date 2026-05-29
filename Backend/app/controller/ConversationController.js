const Conversation = require("../models/Conversation");

class ConversationController {

  static async getMyConversations(
    req,
    res
  ) {

    try {

      const conversations =
      await Conversation.find({
        member: req.user._id,
      })
      .populate(
        "member",
        "name email profileImage online"
      );

      const users =
      conversations.map((conversation) => {

        const user =
        conversation.member.find(
          (member) =>
            member._id.toString() !==
            req.user._id.toString()
        );

        return {
          ...user._doc,
          conversationId:
          conversation._id,
        };

      });

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