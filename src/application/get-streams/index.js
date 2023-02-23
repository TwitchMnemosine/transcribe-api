class GetStreams {
  constructor({twitchService}) {
    this.twitchService = twitchService;
  }

  async execute({twitchChannelId}){
    const streams = await this.twitchService.getStreamsByUserId(twitchChannelId);
    return streams;
  }
}

module.exports = GetStreams