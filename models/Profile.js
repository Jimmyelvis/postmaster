const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  bio: String,
  email: String,
  companyname: String,
  logo: String,
  phone: String,
  dateCreated: Date,
});

module.exports = mongoose.model("profile", profileSchema);
