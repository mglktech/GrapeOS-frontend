const axios = require('axios');

const DEFAULT_OPTIONS = {
	steamids: '76561197995263974', // My steam ID (it's public info anyway)
	timeout: 5000,
};

class Server {
	constructor(apiKey, options) {
		if (!apiKey) throw Error('Please provide a Web API Key.');
		this.apiKey = apiKey;
		this.options = Object.assign(DEFAULT_OPTIONS, options);
	}
	GetPlayerSummaries() {
		return new Promise((send, err) => {
			axios
				.get(
					`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${this.apiKey}&steamids=${this.options.steamids}`,
					{
						timeout: this.options.timeout,
					}
				)
				.then(function (body) {
					send(body.data.response.players[0]);
				})
				.catch(function (error) {
					err(error);
				});
		});
	}
	GetOwnedGames() {
		return new Promise((send, err) => {
			axios
				.get(
					`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${this.apiKey}&steamid=${this.options.steamids}&include_appinfo=true`,
					{
						timeout: this.options.timeout,
					}
				)
				.then(function (body) {
					send(body.data.response.games);
				})
				.catch(function (error) {
					console.log('SteamAPI Error');
					err(error);
				});
		});
	}
	GetRecentlyPlayedGames() {
		return new Promise((send, err) => {
			axios
				.get(
					`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${this.apiKey}&steamid=${this.options.steamids}&include_appinfo=true`,
					{
						timeout: this.options.timeout,
					}
				)
				.then(function (body) {
					send(body.data.response.games);
				})
				.catch(function (error) {
					console.log('SteamAPI Error');
					err(error);
				});
		});
	}
}
module.exports = Server;
