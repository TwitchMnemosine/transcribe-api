require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const container = require('./container');

app.use(express.json());
app.use(helmet());
const transcribeRoutes = require('./infrastructure/rest/transcribe-controller');

app.use('/api/v1/transcribe', transcribeRoutes);

const {eventBus:{topicToPublish}} = require('./infrastructure/config');
const messageBroker = container.resolve('messageBroker');
messageBroker.createQueue(topicToPublish);

// TODO: Remove this.
// redisMessageBroker.produce({payload: {msg: 'hey'}, queueTopic: 'transcribe'})
// messageBroker.consume('transcribe')

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
