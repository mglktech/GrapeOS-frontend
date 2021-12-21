// Uses xbl.io API to collect player information with provided API key
// Hosts' account must provide some fields publicly in order for features like live game tracking to work.
const axios = require('axios');
const API_KEY = process.env.xblio_apiKey;
const DEFAULT_OPTIONS = {
	timeout: 5000,
};
const DEFAULT_HEADERS = {
	Accept: 'application/json',
	'X-Authorization': API_KEY,
};
const root_url = 'https://xbl.io/api/v2';

class ApiPortal {
	constructor(options) {
		this.options = Object.assign(DEFAULT_OPTIONS, options);
		this.headers = Object.assign(DEFAULT_HEADERS);
	}
	// getSomething()
	// return new promise
	// axios.get(`https://some.kind.of.route`, {headers})
	getAccountInfo() {
		return new Promise((send, err) => {
			axios
				.get(`${root_url}/account`, {
					headers: this.headers,
					timeout: this.options.timeout,
				})
				.then(function (body) {
					send(body.data);
					//err("Error: forced error"); // For Debugging servers with bad connections
				})
				.catch(function (error) {
					err(error);
				});
		});
	}
	getPlayerSummary() {
		return new Promise((send, err) => {
			axios
				.get(`${root_url}/player/summary`, {
					headers: this.headers,
					timeout: this.options.timeout,
				})
				.then(function (body) {
					send(body.data);
					//err("Error: forced error"); // For Debugging servers with bad connections
				})
				.catch(function (error) {
					err(error);
				});
		});
	}

	// getInfo_prune() {
	// 	return new Promise((send, err) => {
	// 		axios
	// 			.get(`http://${this.ip}/info.json`, { timeout: this.options.timeout })
	// 			.then(function (body) {
	// 				//let info = body.data;
	// 				let vars = new Map(Object.entries(body.data.vars));
	// 				let info = {
	// 					resources: body.data.resources,
	// 					enhancedHostSupport: body.data.enhancedHostSupport,
	// 					//icon: body.data.icon,
	// 					online: true,
	// 					server: body.data.server,
	// 					vars,
	// 				};
	// 				send(info);
	// 			})
	// 			.catch(function (error) {
	// 				err(error);
	// 			});
	// 	});
	// }
	// getVars() {
	// 	return new Promise((send, err) => {
	// 		axios
	// 			.get(`http://${this.ip}/info.json`, { timeout: this.options.timeout })
	// 			.then(function (body) {
	// 				//let info = body.data;
	// 				let vars = new Map(Object.entries(body.data.vars));
	// 				send(vars);
	// 			})
	// 			.catch(function (error) {
	// 				err(error);
	// 			});
	// 	});
	// }
}

module.exports.ApiPortal = ApiPortal;
