const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passportLocal = require("passport-local").Strategy;

// const mongoose = require("mongoose");
// const User = mongoose.model("users");

// http://localhost:5000//auth/facebook

module.exports = (app) => {
  app.get("/api/user", (req, res, next) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });



   app.post("/api/register", (req, res, next) => {
     User.findOne({ username: req.body.username }, async (err, doc) => {
       if (err) throw err;

       console.log("doc", doc);
       console.log("req.body", req.body.username);


       if (doc) {
         return res.status(400).json({ 
           "msg" : " A user already exists with that username"
          })
       } else {
           const hashedPassword = await bcrypt.hash(req.body.password, 10);

           const newUser = new User({
             username: req.body.username,
             password: hashedPassword,
           });
           await newUser.save();
           res.send("User Created");
       }
     });
   });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        return res.status(400).json({
          msg: "Username or Password is Incorrect",
        });
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(user)
          // res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();

    res.redirect("/");
  });

  // Decides whether or not a user is signed in
  app.get("/api/current_user", (req, res) => {

    console.log("req", req.body);

    res.send(req.user);
  });
};
