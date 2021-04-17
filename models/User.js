const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0 },
  username: String,
  password: String,
});

// mongoose.model("users", userSchema);

module.exports = mongoose.model("users", userSchema);
