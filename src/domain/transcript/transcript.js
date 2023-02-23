const AggregateRoot = require('../aggregate-root');
const InvalidTranscriptError = require('./errors/invalid-transcript-error.js');
const TranscriptCreatedEvent = require('./events/transcript-created-event');

class Transcript extends AggregateRoot {
  constructor({ id, streamId, twitchChannelId, twitchCannelName, trasncriptions }) {
    super();
    this.id = id;
    this.streamId = streamId;
    this.twitchChannelId = twitchChannelId;
    this.twitchCannelName = twitchCannelName;
    this.trasncriptions = trasncriptions;
  }

  static create({ id, streamId, twitchChannelId, twitchCannelName, trasncriptions }) {
    const transcript = new Transcript({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      trasncriptions
    });

    transcript.addEvent(new TranscriptCreatedEvent(transcript));
    return transcript;
  }

  set id(id) {
    if (!id) {
      throw new InvalidTranscriptError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set streamId(streamId) {
    if (!streamId) {
      throw new InvalidTranscriptError('Field streamId cannot be empty');
    }

    this._streamId = streamId;
  }

  get streamId() {
    return this._streamId;
  }

  set twitchChannelId(twitchChannelId) {
    if (!twitchChannelId) {
      throw new InvalidTranscriptError('Field twitchChannelId cannot be empty');
    }

    this._twitchChannelId = twitchChannelId;
  }

  get twitchChannelId() {
    return this._twitchChannelId;
  }

  set twitchCannelName(twitchCannelName) {
    if (!twitchCannelName) {
      throw new InvalidTranscriptError('Field twitchCannelName cannot be empty');
    }

    this._twitchCannelName = twitchCannelName;
  }

  get twitchCannelName() {
    return this._twitchCannelName;
  }

  set trasncriptions(trasncriptions) {
    if (!trasncriptions) {
      throw new InvalidTranscriptError('Field trasncriptions cannot be empty');
    }

    this._trasncriptions = trasncriptions;
  }

  get trasncriptions() {
    return this._trasncriptions;
  }

  toObject() {
    return{
      id: this.id,
      streamId: this.streamId,
      twitchChannelId: this.twitchChannelId,
      twitchCannelName: this.twitchCannelName,
      trasncriptions: this.trasncriptions
    }
  }
}

module.exports = Transcript;