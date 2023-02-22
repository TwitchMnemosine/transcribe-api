const awilix = require('awilix');

const MUUID = require('uuid-mongodb');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler')
const {v4: uuidv4} = require('uuid');
const idGenerator = require('./domain/services/id-generator');
const TranscriptStream = require('./application/transcript-stream');
const MongoTranscriptsRepository = require('./infrastructure/persistence/mongo/mongo-transcribe-repository');
const transcriptDocumentParser = require('./infrastructure/persistence/mongo/transcript-document-parser');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
  muid: awilix.asValue(MUUID),
  mongoDbHandler: awilix.asFunction(mongoDbHandler),
  uuidv4: awilix.asValue(uuidv4),
  idGenerator: awilix.asFunction(idGenerator),
  transcriptStream: awilix.asClass(TranscriptStream),
  transcriptRepository: awilix.asClass(MongoTranscriptsRepository),
  transcriptDocumentParser: awilix.asFunction(transcriptDocumentParser),
});

module.exports = container;
