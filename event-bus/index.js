const express = require('express');
const axios = require('axios');
const { randomBytes, scryptSync } = require('crypto');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  //  axios.post('http://localhost:4000/events', event).catch((err) => {
  //  dank k8s jetzt einfach den Service-Namen mit zugewiesenem Port
  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('EventBus listening on 4005');
});
