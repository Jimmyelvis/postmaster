const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'fooollllllllllllll' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//https://gruesome-grave-12486.herokuapp.com/ | https://git.heroku.com/gruesome-grave-12486.git
