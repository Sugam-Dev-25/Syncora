const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    online:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
}   
);

module.exports = mongoose.model("User", userSchema);