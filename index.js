require('dotenv-safe').config();

const express = require('express');
const FCM = require('fcm-push');
const app = express();

const fcm = new FCM(process.env.SERVER_KEY);


app.get('/', (req, res) => res.send('Hello World!'));


app.get('/message', (req, res) => {
  const message = {
    to: req.query.deviceToken,
    notification: {
      title: req.query.title,
      body: req.query.body
    }
  }

  fcm.send(message)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      res.status(500);
      res.json({ error: err })
    })

});

app.listen(4000, () => console.log('Example app listening on port 3000!'));

