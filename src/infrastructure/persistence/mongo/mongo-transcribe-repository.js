const TRANSCRIPTS = 'transcripts';

class MongoTranscriptRepository {
  constructor({mongoDbHandler, transcriptDocumentParser, muid}) {
    this.mongoDbHandler = mongoDbHandler;
    this.transcriptDocumentParser = transcriptDocumentParser;
    this.muid = muid;
  }

  async findById(id) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const transcriptDomain = await db.collection(TRANSCRIPTS).findOne({_id: this.muid.from(id)});
      return transcriptDomain ? this.transcriptDocumentParser.toDomain(transcriptDomain) : null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(transcript) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const transcriptDomain = this.transcriptDocumentParser.toDocument(transcript);
      await db.collection(TRANSCRIPTS).insertOne(transcriptDomain);

      return Promise.resolve();
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MongoTranscriptRepository