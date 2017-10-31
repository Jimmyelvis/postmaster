const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'mannnn' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//https://chilling-witch-52579.herokuapp.com/ | https://git.heroku.com/chilling-witch-52579.git
