const Transcription = require('../../../domain/transcription/Transcription');

const transcriptDocumentParser = ({ muid }) => {
  return {
    toDomain: ({
      _id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      trasncriptions,
    }) => {
      const id = (muid.from(_id)).toString();
      return new Transcription({
        id,
        streamId,
        twitchChannelId,
        twitchCannelName,
        trasncriptions,
      })
    },
    toDocument: ({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      trasncriptions,
    }) => {
      const _id = muid.from(id);
      return {
        _id,
        streamId,
        twitchChannelId,
        twitchCannelName,
        trasncriptions,
      }
    }
  }
}

module.exports = transcriptDocumentParser;