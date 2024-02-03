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

const Survey = mongoose.model('surveys');

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

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');


    _.chain(req.body)
      .map(({
        email,
        url
      }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({
        surveyId,
        email,
        choice
      }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false
            }
          }
        }, {
          $inc: {
            [choice]: 1
          },
          $set: {
            'recipients.$.responded': true
          },
          lastResponded: new Date()
        }).exec();
      })
      .value();

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

    // Great place to send an email!

    /*
     TODO: Uncomment this code to send an email, after we figure out why Sendgrid is not working
    */
    const mailer = new Mailer(survey, surveyTemplate(survey));

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


// BEFORE LODASH CHAIN METHOD
//
// app.post('/api/surveys/webhooks', (req, res) => {
//   const p = new Path('/api/surveys/:surveyId/:choice');
//
//   const events = _.map(req.body, ({ email, url }) => {
//     const match = p.test(new URL (url).pathname);
//     if (match) {
//        return { email, surveyId: match.surveyId, choice: match.choice };
//      }
//   });
//
//   const compactEvents =_.compact(events);
//   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
//
//   console.log(uniqueEvents);
//   res.send({});
// });