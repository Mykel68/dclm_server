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
      "Super admin",
    ],
  },
  userType: {
    type: String,
    required: true,
    enum: ["Admin", "Super admin"],
  },
  Image: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (this.section === "Super admin") {
    this.userType = "Super admin";
  } else {
    this.userType = "Admin";
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
