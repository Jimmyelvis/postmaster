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
  emailList: {
    type: [String],
    validate: {
      validator: function(emailArray) {
        // Check for uniqueness
        return emailArray.length === new Set(emailArray).size;
      },
      message: 'Emails in the email list must be unique.'
    }
  },
});

module.exports = mongoose.model("profile", profileSchema);
