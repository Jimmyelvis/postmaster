const User = require("../models/User");
const Profile = require("../models/Profile.js");
const requireLogin = require("../middlewares/requireLogin");
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = (app) => {

  /*
  * Original code which returned the entire profile object, including the emailList field
  */
  app.get("/api/profile-orig", requireLogin, async (req, res, next) => {
    const profile = await Profile.find({
      user: req.user.id,
    });
    res.send(profile);
  });


   /*
  * Alternatge code which returns the entire profile object, excluding the emailList field
  */
  app.get("/api/profile", requireLogin, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
        .select('-emailList'); // Excluding the emailList field
  
      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }
  
      res.send(profile);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
 /*
  * Returns the emailList field of the profile object
  */
  app.get("/api/profile/emails", requireLogin, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }, 'emailList');
  
      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }
  
      res.send(profile.emailList);
    } catch (err) {
      res.status(500).send(err);
    }
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

  /*
    Create a new email in the email list
  */
  app.patch("/api/profile/email", requireLogin, async (req, res) => {
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).send({ error: "Email is required." });
    }

    if (!emailRegex.test(newEmail)) {
      return res.status(400).send({ error: "Invalid email format." });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }

      if (profile.emailList.includes(newEmail)) {
        return res.status(400).send({ error: "Email already exists in the list." });
      }

      profile.emailList.push(newEmail);

      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(422).send(err);
    }
  });

   /*
    Create multiple new emails in the email list
  */
  app.patch("/api/profile/multiemails", requireLogin, async (req, res) => {
    const { newEmails } = req.body;

    if (!newEmails || !Array.isArray(newEmails) || newEmails.length === 0) {
      return res.status(400).send({ error: "A list of emails is required." });
    }

    const invalidEmails = newEmails.filter(email => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      return res.status(400).send({ error: "Invalid email format in the provided list.", invalidEmails });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }

      const existingEmails = newEmails.filter(email => profile.emailList.includes(email));
      if (existingEmails.length > 0) {
        return res.status(400).send({ error: "Some emails already exist in the list.", existingEmails });
      }

      profile.emailList.push(...newEmails);

      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(422).send(err);
    }
  });


  /*
    Edit an existing email in the email list
  */
  app.patch("/api/profile/edit-email", requireLogin, async (req, res) => {
    const { oldEmail, newEmail } = req.body;

    if (!oldEmail || !newEmail) {
      return res.status(400).send({ error: "Both old and new emails are required." });
    }

    if (!emailRegex.test(newEmail)) {
      return res.status(400).send({ error: "Invalid new email format." });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }

      const emailIndex = profile.emailList.indexOf(oldEmail);
      if (emailIndex === -1) {
        return res.status(404).send({ error: "Old email not found in the list." });
      }

      if (profile.emailList.includes(newEmail)) {
        return res.status(400).send({ error: "New email already exists in the list." });
      }

      // Replace old email with new email
      profile.emailList[emailIndex] = newEmail;
      profile.markModified('emailList');
      console.log({
        "profile-before save": profile,
      });

      await profile.save();

      console.log({
        "profile-after save before send": profile,
      })

      res.send(profile);
    } catch (err) {
      console.log({
        "error": err,
      });
      res.status(422).send(err);
    }
  });

  /*
    Delete an existing email in the email list
  */
  app.delete("/api/profile/delete-email", requireLogin, async (req, res) => {
    const { emailToDelete } = req.body;

    if (!emailToDelete) {
      return res.status(400).send({ error: "Email to delete is required." });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }

      const emailIndex = profile.emailList.indexOf(emailToDelete);
      if (emailIndex === -1) {
        return res.status(404).send({ error: "Email not found in the list." });
      }

      // Remove the email from the list
      profile.emailList.splice(emailIndex, 1);

      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(422).send(err);
    }
  });

    /*
    Delete multiple emails in the email list, or if the 'all' flag is true, delete all emails
  */
  app.delete("/api/profile/multi-delete-emails", requireLogin, async (req, res) => {
    const { emailsToDelete, all } = req.body; // Expecting an array of emails or a flag 'all'

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(404).send({ error: "Profile not found." });
      }

      if (all === true) {
        // Delete all emails if 'all' flag is true
        profile.emailList = [];
      } else if (Array.isArray(emailsToDelete) && emailsToDelete.length > 0) {
        // Filter out the emails to be deleted
        profile.emailList = profile.emailList.filter(email => !emailsToDelete.includes(email));
      } else {
        return res.status(400).send({ error: "Invalid request. Provide an array of emails to delete or 'all: true' to delete all." });
      }

      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(422).send(err);
    }
  });

};
