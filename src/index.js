require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const container = require('./container');

app.use(cors())
app.use(express.json());
app.use(helmet());

const transcribeRoutes = require('./infrastructure/rest/transcribe-controller');
const streamRoutes = require('./infrastructure/rest/streams-controller');

app.use('/api/v1/transcribe', transcribeRoutes);
app.use('/api/v1/streams', streamRoutes);

const {eventBus:{topicToPublish}} = require('./infrastructure/config');
const messageBroker = container.resolve('messageBroker');
messageBroker.createQueue(topicToPublish);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
