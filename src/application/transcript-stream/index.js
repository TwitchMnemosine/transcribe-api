const Transcript = require('../../domain/transcript/transcript');

class TranscriptStream {
  constructor({idGenerator, transcriptRepository, messageBroker}) {
    this.idGenerator = idGenerator;
    this.transcriptRepository = transcriptRepository;
    this.messageBroker = messageBroker;
  }

  async execute({streamId, twitchChannelId}){
    const id = this.idGenerator.generate();
    const transcriptDomain = Transcript.create({
      id,
      streamId,
      twitchChannelId,
      twitchCannelName: 'sample',
      trasncriptions: [] 
    });

    await this.transcriptRepository.save(transcriptDomain);
    await this.messageBroker.produce(transcriptDomain.getEvents());
  }
}

module.exports = TranscriptStream