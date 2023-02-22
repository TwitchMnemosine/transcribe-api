const Transcript = require('../../domain/transcription/Transcription');

class TranscriptStream {
  constructor({idGenerator, transcriptRepository}) {
    this.idGenerator = idGenerator;
    this.transcriptRepository = transcriptRepository;
  }

  async execute({streamId, twitchChannelId}){
    const id = this.idGenerator.generate();
    const transcriptDomain = new Transcript({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName: 'sample',
      trasncriptions: [] 
    })
    await this.transcriptRepository.save(transcriptDomain)
    return {streamId,twitchChannelId};
  }
}

module.exports = TranscriptStream