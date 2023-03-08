class Transcriptions {
  constructor({ start, end, text, language }) {
    this.start = start;
    this.end = end;
    this.text = text;
    this.language = language;
  }

  set start(start) {
    if (!start) {
      throw new InvalidTranscriptionsError('Field start cannot be empty');
    }

    this._start = start;
  }

  get start() {
    return this._start;
  }

  set end(end) {
    if (!end) {
      throw new InvalidTranscriptionsError('Field end cannot be empty');
    }

    this._end = end;
  }

  get end() {
    return this._end;
  }

  set text(text) {
    if (!text) {
      throw new InvalidTranscriptionsError('Field text cannot be empty');
    }

    this._text = text;
  }

  get text() {
    return this._text;
  }

  set language(language) {
    if (!language) {
      throw new InvalidTranscriptionsError('Field language cannot be empty');
    }

    this._language = language;
  }

  get language() {
    return this._language;
  }

  toObject() {
    return {
      start: this.start,
      end: this.end,
      text: this.text,
      language: this.language,
    };
  }
}

module.exports = Transcriptions;