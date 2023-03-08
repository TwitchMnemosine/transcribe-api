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
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID || '42vuug227lhrgyix2j6s0s5qwky4x3',
    clientSecret: process.env.TWITCH_CLIENT_SECRET || 'Nope',
    apiBaseUrl: process.env.TWITCH_BASE_URL_API || 'https://api.twitch.tv/helix',
    oauthBaseUrl: process.env.TWITCH_BASE_URL_AUTH || 'https://id.twitch.tv/oauth2/token',
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
  twitch: {
    clientId: 'clientId',
    clientSecret: 'clientSercret',
    baseUrl: 'baseUrlTwitch',
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