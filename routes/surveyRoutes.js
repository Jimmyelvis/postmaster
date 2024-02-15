const _ = require('lodash');
const Path = require('path-parser');
const {
  URL
} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const emailTemplate = require('../services/emailTemplates/emailTemplate');

const Survey = mongoose.model('surveys');
const keys = require('../config/keys');
const Profile = mongoose.model('profile');

module.exports = app => {

  app.get('/api/surveysallusers', requireLogin, async (req, res) => {
    const surveys = await Survey.find()
      .select({
        recipients: false
      })
      .populate('_user', ['username'])
      .sort({
        dateSent: -1
      });

      console.log("req.user.id: ", req.user);

    res.send(surveys);
  });

  app.get('/api/surveys-orig', requireLogin, async (req, res) => {
    const surveys = await Survey.find({
        _user: req.user.id
      })
      .select({
        recipients: false
      })
      .populate('_user', ['username'])
      .sort({
        dateSent: -1
      });

      console.log("req.user.id: ", req.user);

    res.send(surveys);
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.aggregate([
      { $match: { _user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: 1,
          body: 1,
          subject: 1,
          company: 1,
          yes: 1,
          no: 1,
          _user: 1,
          dateSent: 1,
          lastResponded: 1,
          totalResponded: {
            $size: {
              $filter: {
                input: "$recipients",
                as: "recipient",
                cond: { $eq: ["$$recipient.responded", true] }
              }
            }
          }
        }
      },
      { $sort: { dateSent: -1 } }
    ]);
  
    res.send(surveys);
  });
  

  // @route  Get /api/:surveyId
  // @desc   Get a specific survey
  // @access private
  app.get('/api/surveys/:surveyId', requireLogin, async (req, res) => {
    const survey = await Survey.findById({
      _id: req.params.surveyId
    })
    res.send(survey)
  })


  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks For Voting');
  });

  app.post('/api/surveys/webhooks', async (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // Validate URLs Before Parsing: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    const isValidHttpUrl = (string) => {
      let url;
      
      try {
        url = new URL(string);
      } catch (_) {
        return false; 
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    };
  
    // Parse and filter valid responses
    const events = req.body
      .map(({ email, url }) => {

        if (!isValidHttpUrl(url)) {
          console.error(`Invalid URL skipped: ${url}`);
          return null;
        }

        console.log(url); 
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
        return null;
      })
      .filter(event => event !== null);
  
    // Remove duplicates
    const uniqueEvents = Array.from(new Map(events.map(event => [event.email + event.surveyId, event])).values());

  
    // Update surveys based on the unique events
    for (let { surveyId, email, choice } of uniqueEvents) {
      await Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: {
            email: email,
            responded: false
          }
        }
      }, {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date()
      });
    }
  
    res.send({});
  });
  

  app.post('/api/surveys/', requireLogin, requireCredits, async (req, res) => {

    const {
      title,
      subject,
      body,
      company,
      recipients
    } = req.body;

    const profile = await Profile.findOne({ user: req.user.id })
        .populate("user", ["username"])
        .select('-emailList'); // Excluding the emailList field


    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      company: company,
      recipients: recipients.split(',').map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    res.render('emailTemplate', {
      layout: false, // This tells Express Handlebars not to use a default layout
      survey: survey,
      keys: keys,
      profile: profile
    }, async (err, html) => {

      if (err) {
        console.log(err);
        return res.status(500).send('Error rendering email');
      }

      // Great place to send an email!
      const mailer = new Mailer(survey, html);
  
      try {
        await mailer.send();  
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
  
        res.send(user);
      } catch (err) {
        console.log("error: ", err);
        res.status(422).send(err);
      }

    });


  });

  app.delete('/api/surveys/delete/:id', async (req, res) => {
    await Survey.deleteOne({ _id: req.params.id });




    const surveys = await Survey.find({ _user: req.user.id }).sort({dateSent: -1}).select({
      recipients: false
    });
    res.send(surveys);
  });


  app.get('/api/getsurveys/search', requireLogin, async (req, res) => {
    const searchTerm = req.query.term;
  
    if (!searchTerm) {
      return res.status(400).send({ error: 'Search term is required' });
    }
  
    try {
      const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive
      const surveys = await Survey.find({
        title: { $regex: regex },
        _user: req.user.id // find surveys belonging to the logged-in user
      })
      .select({ recipients: false })
      .populate('_user', ['username'])
      .sort({ dateSent: -1 });
  
      res.send(surveys);
    } catch (err) {
      res.status(500).send({ error: 'Error searching for surveys' });
    }
  });
  

};

