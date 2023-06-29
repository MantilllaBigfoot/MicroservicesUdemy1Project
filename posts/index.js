const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    //await axios.post('http://localhost:4005/events', {
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    });
  } catch (err) {
    console.log('An error occured');
  }

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  console.log('Received event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('v1.1');
  console.log('Posts istening on 4000');
});
