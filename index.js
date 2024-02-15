const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const keys = require("./config/keys");

const bodyParser = require("body-parser");

// Import models
require("./models/User");
require("./models/Survey");
require("./models/Profile");
require("./services/passportGoogle")(passport);
require("./services/passportFacebook")(passport);
require("./services/passportLocal")(passport);

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Set up Handlebars
app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './services/emailTemplates');

// Import routes
require("./routes/authRoutes")(app);
require("./routes/socialroutes/facebook")(app);
require("./routes/socialroutes/google")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/profileRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//https://gruesome-grave-12486.herokuapp.com/ | https://git.heroku.com/gruesome-grave-12486.git

const PORT = process.env.PORT || 10000;
app.listen(PORT);
