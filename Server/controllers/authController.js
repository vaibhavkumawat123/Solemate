import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        bio: newUser.bio,
        avatar: newUser.avatar,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// LOGIN
// =============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// GOOGLE LOGIN
// =============================
export const googleLogin = async (req, res) => {
  try {
    const { name, email, googleId, avatar } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        await user.save();
      }
    } else {
      // CREATE new Google user
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        authProvider: "google", 
        password: undefined, 
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Google login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        googleId: user.googleId,
      },
      token,
    });
  } catch (err) {
    console.warn("Google Login Error:", err);
    res.status(500).json({ message: "Google Login Failed", error: err });
  }
};

// =============================
// UPDATE PROFILE
// =============================
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    const { name, email, phone, bio } = req.body;

    let updatedFields = { name, email, phone, bio };

    if (req.file) {
      updatedFields.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ ERROR IN updateProfile:", err);
    return res.status(500).json({ message: "Profile update failed" });
  }
};

// =============================
// CHANGE PASSWORD
// =============================
export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    // Hash new password manually
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("❌ Change Password Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
