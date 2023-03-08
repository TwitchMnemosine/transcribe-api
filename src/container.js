const awilix = require('awilix');

// infrastructure
const MUUID = require('uuid-mongodb');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler')
const {v4: uuidv4} = require('uuid');
const idGenerator = require('./domain/services/id-generator');
const MongoTranscriptsRepository = require('./infrastructure/persistence/mongo/mongo-transcribe-repository');
const transcriptDocumentParser = require('./infrastructure/persistence/mongo/transcript-document-parser');
const redisSmq = require('redis-smq');
const redisMessageBroker = require('./infrastructure/bus/redis-message-broker');
const axios = require('axios');
const twitchService = require('./infrastructure/services/twitch/twitch-service');

// application
const TranscriptStream = require('./application/transcript-stream');
const GetStreams = require('./application/get-streams/');
const GetTranscript = require('./application/get-transcript/');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
})

const infrastructure = {
  muid: awilix.asValue(MUUID),
  mongoDbHandler: awilix.asFunction(mongoDbHandler),
  uuidv4: awilix.asValue(uuidv4),
  idGenerator: awilix.asFunction(idGenerator),
  transcriptRepository: awilix.asClass(MongoTranscriptsRepository),
  transcriptDocumentParser: awilix.asFunction(transcriptDocumentParser),
  redisSmq: awilix.asValue(redisSmq),
  messageBroker: awilix.asClass(redisMessageBroker).singleton(),
  httpClient: awilix.asValue(axios),
  twitchService: awilix.asClass(twitchService),
}

const application = {
  transcriptStream: awilix.asClass(TranscriptStream),
  getStreams: awilix.asClass(GetStreams),
  getTranscript: awilix.asClass(GetTranscript),
}

container.register({
  ...infrastructure,
  ...application
});

module.exports = container;
