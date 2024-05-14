const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());

const register = async (req, res, next) => {
  try {
    const { name, email, password, section } = req.body;

    if (!name || !email || !password || !section) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and section are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Determine the userType based on the selected section
    let userType = "Admin";
    if (section === "Super admin") {
      userType = "Super admin";
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the determined userType
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      section,
      userType,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Generate JWT token with userType included in payload
    const tokenPayload = {
      userType: user.userType,
      section: user.section,
      id: user._id,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ token });
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await User.find({ userType: "Admin" });
    res.json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAdminCount = async (req, res, next) => {
  try {
    const adminCount = await User.countDocuments({ userType: "Admin" });
    res.json({ adminCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Profile = async (req, res) => {
  const { id } = req.params;
  try {
    const UserDetails = await User.findById(id);
    if (!UserDetails) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(UserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const EditProfile = async (res, req) => {
//   const { id } = req.params;
//   try {
//     const { name, password, Image } = req.body;

//     const updateProfile = await Report.findByIdAndUpdate(
//       { _id: id },
//       {
//         name,
//         password,
//         Image,
//       },
//       { new: true }
//     );

//     if (!updateProfile) {
//       return res.status(404).json({ error: "Report not found" });
//     }

//     res.status(200).json(updateProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  register,
  login,
  getAllAdmin,
  getAdminCount,
  Profile,
  // EditProfile,
};
