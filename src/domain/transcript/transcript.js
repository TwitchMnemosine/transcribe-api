const InvalidTranscriptError = require('./errors/invalid-transcript-error.js');

class Transcript {
  constructor({ id, streamId, twitchChannelId, twitchCannelName, trasncriptions }) {
    this.id = id;
    this.streamId = streamId;
    this.twitchChannelId = twitchChannelId;
    this.twitchCannelName = twitchCannelName;
    this.trasncriptions = trasncriptions;
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

}

module.exports = Transcript;