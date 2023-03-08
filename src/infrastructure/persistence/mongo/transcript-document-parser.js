const Transcript = require('../../../domain/transcript/transcript');
const Transcriptions = require('../../../domain/transcript/transcriptions');

const transcriptDocumentParser = ({ muid }) => {
  return {
    toDomain: ({
      _id,
      streamId,
      streamName,
      twitchChannelId,
      twitchCannelName,
      status,
      duration,
      transcriptions,
    }) => {
      const id = (muid.from(_id)).toString();
      const formatTranscriptions = transcriptions.map(transcriptionsCurrent => new Transcriptions(transcriptionsCurrent).toObject());

      return new Transcript({
        id,
        streamId,
        streamName,
        twitchChannelId,
        twitchCannelName,
        status,
        duration,
        transcriptions: formatTranscriptions
      })
    },
    toDocument: ({
      id,
      streamId,
      streamName,
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
        streamName,
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