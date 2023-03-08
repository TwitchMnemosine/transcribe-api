const Transcript = require('../../domain/transcript/transcript');
const { LOADING } = require('../../domain/transcript/status-list');

class TranscriptStream {
  constructor({ idGenerator, transcriptRepository, twitchService, messageBroker }) {
    this.idGenerator = idGenerator;
    this.transcriptRepository = transcriptRepository;
    this.twitchService = twitchService;
    this.messageBroker = messageBroker;
  }

  async execute({ streamId }) {
    const stream = await this.twitchService.getStreamById(streamId);
    console.log(stream)
    const { user_id, user_login, duration, title } = stream.data[0];

    const id = this.idGenerator.generate();
    const transcriptDomain = Transcript.create({
      id,
      streamId,
      twitchChannelId: user_id,
      twitchCannelName: user_login,
      streamName: title,
      status: LOADING,
      duration: this._extractDuration(duration),
      transcriptions: []
    });

    await this.transcriptRepository.save(transcriptDomain);
    await this.messageBroker.produce(transcriptDomain.getEvents());
  }

  _extractDuration(duration) {
    const durationCopy = duration.slice(0, -1);
  
    const formatString = ['h', 'm']
    const stringDuration = durationCopy.split('').map(char => formatString.includes(char) ? char = ':' : char).join('')
    const splitByPosition = stringDuration.split(':');
    if(splitByPosition.length === 3) {
      return parseInt(splitByPosition[0]) * 3600 + parseInt(splitByPosition[1]) * 60 + parseInt(splitByPosition[2])
    }
  
    if(splitByPosition.length === 2) {
      return parseInt(splitByPosition[0] * 60) + parseInt(splitByPosition[1])
    }
  
    return parseInt(splitByPosition[0])
  }
}

module.exports = TranscriptStream