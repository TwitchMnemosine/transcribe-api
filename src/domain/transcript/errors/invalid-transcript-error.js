class InvalidTranscriptError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidTranscriptError;