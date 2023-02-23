const {twitch: {clientId: clientIdTwitch, clientSecret: clientSecretTwitch, apiBaseUrl, oauthBaseUrl}} = require('../../config');

class TwitchService {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  async _generateToken() {
    const response = await this.httpClient.post(`${oauthBaseUrl}?client_id=${clientIdTwitch}&client_secret=${clientSecretTwitch}&grant_type=client_credentials`);
    return response.data;
  }

  async getStreamsByUserId(twitchChannelId) {
    const {access_token} = await this._generateToken();
    const response = await this.httpClient.get(`${apiBaseUrl}/videos?user_id=${twitchChannelId}&type=archive`,{
      headers: {
        'Client-id': clientIdTwitch,
        'Authorization': `Bearer ${access_token}`,
      }
    });

    return response.data;
  }
}

module.exports = TwitchService;