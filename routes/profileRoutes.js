const User = require("../models/User");
const Profile = require("../models/Profile.js");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.get("/api/profile", requireLogin, async (req, res, next) => {
    const profile = await Profile.find({
      user: req.user.id,
    });
    res.send(profile);
  });

  app.post("/api/profile", requireLogin, async (req, res) => {
    const { bio, email, companyname, logo, phone } = req.body;

    const profile = new Profile({
      bio: bio,
      email: email,
      companyname: companyname,
      logo: logo,
      phone: phone,
      user: req.user.id,
      dateCreated: Date.now(),
    });

    try {
      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
