class InvalidTranscriptionsError extends ApplicationError {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = InvalidTranscriptionsError;
