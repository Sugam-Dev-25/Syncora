const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const cloudinary = require("../config/cloudinary");

class MessageController {
    static async sendMessage(req, res) {
        try {
            const { conversationId, text, file } = req.body;

            let fileUrl = "";
            let fileType = "";
            if (file) {
                const result = await cloudinary.uploader.upload(file);
                fileUrl = result.secure_url;
                fileType = result.format;
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
            const messages = await Message.find({ conversationId }).populate("sender", "name email profileImage");
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

    static async markSeen(req, res){
        try{
            const message= await Message.findByIdAndUpdate(req.params.id, 
                { seen: true }, 
                { new: true });
            res.status(200).json({
                success: true,
                message,
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }

}

module.exports = MessageController;