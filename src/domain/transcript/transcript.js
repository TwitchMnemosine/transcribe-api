const AggregateRoot = require('../aggregate-root');
const InvalidTranscriptError = require('./errors/invalid-transcript-error.js');
const TranscriptCreatedEvent = require('./events/transcript-created-event');

class Transcript extends AggregateRoot {
  constructor({ id, streamId, twitchChannelId, twitchCannelName, status, duration, transcriptions }) {
    super();
    this.id = id;
    this.streamId = streamId;
    this.twitchChannelId = twitchChannelId;
    this.twitchCannelName = twitchCannelName;
    this.status = status;
    this.duration = duration;
    this.transcriptions = transcriptions;
  }

  static create({ id, streamId, twitchChannelId, twitchCannelName, status, duration, transcriptions }) {
    const transcript = new Transcript({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      status,
      duration,
      transcriptions
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

  set status(status) {
    if (!status) {
      throw new InvalidTranscriptError('Field status cannot be empty');
    }

    this._status = status;
  }

  get status() {
    return this._status;
  }

  set duration(duration) {
    if (!duration) {
      throw new InvalidTranscriptError('Field duration cannot be empty');
    }

    this._duration = duration;
  }

  get duration() {
    return this._duration;
  }

  set transcriptions(transcriptions) {
    if (!transcriptions) {
      throw new InvalidTranscriptError('Field transcriptions cannot be empty');
    }

    this._transcriptions = transcriptions;
  }

  get transcriptions() {
    return this._transcriptions;
  }

  toObject() {
    return {
      id: this.id,
      streamId: this.streamId,
      twitchChannelId: this.twitchChannelId,
      twitchCannelName: this.twitchCannelName,
      status: this.status,
      duration: this.duration,
      transcriptions: this.transcriptions
    }
  }
}

module.exports = Transcript;