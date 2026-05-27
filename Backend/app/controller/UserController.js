const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

class UserController {
  static async getMyProfile(req, res) {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { name, phone, address, bio } = req.body;

      let updateData = {
        name,
        phone,
        address,
        bio,
      };

      if (req.file) {
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64, {
          folder: "syncora-users",
        });

        updateData.profileImage = result.secure_url;
      }

      const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true },
      ).select("-password");

      res.status(200).json({
        success: true,
        user: updateUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async searchUsers(req, res) {
    try {
      const keyword = req.query.search;

      const users = await User.find({
        $and: [
          {
            _id: { $ne: req.user._id },
          },
          {
            $or: [
              {
                name: {
                  $regex: keyword,
                  $options: "i",
                },
              },
              {
                email: {
                  $regex: keyword,
                  $options: "i",
                },
              },
            ],
          },
        ],
      }).select("-password");

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
