const GetTranscriptResponse = require('./get-transcript-response')

class GetTranscript {
  constructor({ transcriptRepository }) {
    this.transcriptRepository = transcriptRepository;
  }

  async execute({ streamId }) {
    const transcript = await this.transcriptRepository.findByStreamId(streamId);
    return new GetTranscriptResponse({transcript});
  }
}

module.exports = GetTranscript