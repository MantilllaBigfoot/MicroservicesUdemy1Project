const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    try {
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          content: data.content,
          postId: data.postId,
          status,
        },
      });
    } catch (err) {
      console.log('An error occured');
    }
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Moderation listening on 4003');
});
