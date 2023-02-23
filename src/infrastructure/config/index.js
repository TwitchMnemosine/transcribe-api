const env = process.env.NODE_ENV || 'run';
const mongoTimeout = 5000;

const mongoConnectionUri = process.env.MONGO_URI || 'mongodb://admin:admin@mongo:27017';

const run = {
  server: {
    port: process.env.PORT || 3000,
  },
  eventBus: {
    topicToPublish: process.env.TRANSCRIBE_TOPIC_TO_PUBLISH || 'transcribe'
  },
  mongo: {
    mongoConnectionUri,
    mongoTimeout,
    dbName: process.env.DB_NAME || 'transcriptions',
  },
};

const test = {
  server: {
    port: 3000,
  },
  eventBus: {
    topicToPublish: 'transcribe',
  },
  mongo: {
    mongoConnectionUri: null,
    mongoTimeout: 1,
    dbName: 'MOCK',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];