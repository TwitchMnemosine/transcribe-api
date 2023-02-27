const Transcript = require('../../../domain/transcript/transcript');

const transcriptDocumentParser = ({ muid }) => {
  return {
    toDomain: ({
      _id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      status,
      duration,
      transcriptions,
    }) => {
      const id = (muid.from(_id)).toString();
      return new Transcript({
        id,
        streamId,
        twitchChannelId,
        twitchCannelName,
        status,
        duration,
        transcriptions,
      })
    },
    toDocument: ({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName,
      status,
      duration,
      transcriptions,
    }) => {
      const _id = muid.from(id);
      return {
        _id,
        streamId,
        twitchChannelId,
        twitchCannelName,
        status,
        duration,
        transcriptions,
      }
    }
  }
}

module.exports = transcriptDocumentParser;