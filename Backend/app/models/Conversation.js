const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
       member:[
           {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
           },
       ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);