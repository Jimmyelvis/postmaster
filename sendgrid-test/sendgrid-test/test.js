// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "jinjoelife@gmail.com",
  from: "jinjoeweb@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun version 2",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => console.log("It worked"))
  .catch(console.log);
