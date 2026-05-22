const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Conversation",
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
        file:{
            type: String,
            default: "",
        },
        fileType: {
            type: String,
            default: "",
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);