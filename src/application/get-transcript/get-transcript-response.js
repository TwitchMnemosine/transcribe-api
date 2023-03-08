class GetTranscriptResponse {
  constructor({ transcript }) {
    console.log(transcript)
    this.id = transcript.id;
    this.streamId = transcript.streamId;
    this.streamName = transcript.streamName;
    this.twitchChannelId = transcript.twitchChannelId;
    this.twitchCannelName = transcript.twitchCannelName;
    this.status = transcript.status;
    this.duration = transcript.duration;
    this.transcriptions = transcript.transcriptions;
  }
}

module.exports = GetTranscriptResponse;
