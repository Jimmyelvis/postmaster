const survey = { title: 'my title', subject: 'Feedback', recipients: 'jinjoe@zoho.com',
body: 'Give us a shout' };

axios.post('/api/surveys', survey);
