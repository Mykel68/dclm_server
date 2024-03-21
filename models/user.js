const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  section: {
    type: String,
    enum: [
      "Zoom and Playback",
      "Teleprompting",
      "Video",
      "Audio",
      "Streaming",
      "Uplink",
      "Graphics",
      "Super_admin",
    ],
  },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "super_admin"],
  },
});

// Pre-save middleware to set default userType based on selected section
userSchema.pre("save", function (next) {
  if (this.section === "Super_admin") {
    this.userType = "super_admin";
  } else {
    this.userType = "admin";
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
