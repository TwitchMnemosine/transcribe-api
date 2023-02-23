const {eventBus:{topicToPublish}} = require('../../../infrastructure/config');

class TranscriptCreatedEvent {
  constructor(transcript) {
    this.topic = topicToPublish,
    this.name = 'transcript-created',
    this.domain = transcript.toObject();
  }
}

module.exports = TranscriptCreatedEvent;