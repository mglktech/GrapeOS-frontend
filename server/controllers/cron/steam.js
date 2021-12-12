const steamWebAPIKey = process.env.steamWebAPIKey;
const SteamAPI = require('steamapi');
const mySteamID = process.env.steamClientID;
const steam = new SteamAPI(steamWebAPIKey);
const userModel = require('../../../models/user-model');
const gameModel = require('../../../models/steamgame-model');

const getUserSummary = () => {
	return steam
		.getUserSummary(mySteamID)
		.then((data) => data)
		.catch((err) => console.log(err));
};

const getUserRecentGames = () => {
	return steam
		.getUserRecentGames(mySteamID)
		.then((data) => data)
		.catch((err) => console.log(err));
};

const getGameDetails = (appid) => {
	return steam
		.getGameDetails(appid)
		.then((data) => {
			if (!data) {
				return null;
			}
			return data;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
};

module.exports.syncUserSummary = async () => {
	const steamPlayerSummary = await getUserSummary();
	//console.log(steamPlayerSummary);
	userModel
		.findOneAndUpdate(
			{ steamID: steamPlayerSummary.steamID },
			{ steamPlayerSummary }
		)
		.exec();
	if (steamPlayerSummary.gameID) {
		const gameDetails = await getGameDetails(steamPlayerSummary.gameID);
		console.log(`Playing: ${gameDetails.name}`);
		// gameModel
		// 	.findOneAndUpdate({ steam_appid: gameDetails.steam_appid }, gameDetails, {
		// 		upsert: true,
		// 	})
		// 	.exec();
	}
};

module.exports.syncUserRecentGames = async () => {
	const steamRecentGames = await getUserRecentGames();
	if (!steamRecentGames) {
		return;
	}
	steamRecentGames.forEach(async (game) => {
		// find it/add it to steam-games
		const gameDetails = await getGameDetails(game.appID);
		const document = {
			appID: game.appID,
			logoURL: game.logoURL,
			iconURL: game.iconURL,
			gameDetails,
		};

		gameModel
			.findOneAndUpdate({ appID: game.appID }, document, {
				upsert: true,
			})
			.exec();
	});
	//console.log(steamRecentGames);
	userModel
		.findOneAndUpdate({ steamID: mySteamID }, { steamRecentGames })
		.exec();
};
