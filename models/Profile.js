const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  email: String,
  company_name: String,
  company_website: String,
  company_address: String,
  company_city: String,
  company_state: String,
  company_zip: Number,
  company_country: String,
  company_bio: String,
  logo: String,
  phone: String,
  dateCreated: Date,
  dateUpdated : Date,
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
