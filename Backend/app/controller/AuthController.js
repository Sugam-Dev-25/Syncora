const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const generateToken = require("../utils/generateToken");

class AuthController {
  static async registerUser(req, res) {
    try {
      const {
        name,
        email,
        phone,
        password,
        address,
        bio,
        nationality,
        dateOfBirth,
        postcode,
        city,
        state,
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !address ||
        !bio ||
        !nationality ||
        !dateOfBirth ||
        !postcode ||
        !city ||
        !state
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      let imageUrl = "";

      if (req.file) {
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64, {
          folder: "syncora-users",
        });

        imageUrl = result.secure_url;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        address,
        bio,
        nationality,
        dateOfBirth,
        postcode,
        city,
        state,
        profileImage: imageUrl,
      });

      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        postcode: user.postcode,
        city: user.city,
        state: user.state,
        profileImage: user.profileImage,
        token,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        postcode: user.postcode,
        city: user.city,
        state: user.state,
        profileImage: user.profileImage,
        token,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  }
}

module.exports = AuthController;
