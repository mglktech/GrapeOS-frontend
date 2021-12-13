const users = require('../models/user-model');
const games = require('../models/steamgame-model');
const steamid = process.env.steamClientID;

const userGame = async (gameID) => {
	if (gameID) {
		return games.findOne(
			{ appID: gameID },
			'gameDetails.header_image gameDetails.name gameDetails.developers gameDetails.genres'
		);
	}
	return;
};

const info = (steamID, infoType) => {
	if (infoType === 'stream') {
		return users.findOne({ steamID }).then(async (userData) => {
			if (!userData) {
				return;
			}
			const game = await userGame(userData.steamPlayerSummary.gameID);
			return {
				steam_playerSummary: {
					avatar: userData.steamPlayerSummary.avatar,
					url: userData.steamPlayerSummary.url,
					nickname: userData.steamPlayerSummary.nickname,
					game,
					gameID: userData.steamPlayerSummary.gameID,
					personaState: userData.steamPlayerSummary.personaState,
				},
				spotify_recentlyPlayed: userData.lastfmRecentTrack,
				//lastfm_weeklyTrackChart: userData.lastfmWeeklyTrackChart,
			};
		});
	}
	if (infoType === 'main') {
		return users
			.findOne({ steamID }, 'lastfmWeeklyTrackChart steamRecentGames')
			.then(async (userData) => {
				let recentGames = [];
				if (userData.steamRecentGames) {
					for await (game of userData.steamRecentGames) {
						const gameInfo = await games
							.findOne(
								{ appID: game.appID },
								'gameDetails.header_image gameDetails.name gameDetails.developers gameDetails.genres'
							)
							.lean();
						if (gameInfo) {
							recentGames.push(gameInfo);
						}
					}
				}
				return {
					lastfmWeeklyTrackChart: userData.lastfmWeeklyTrackChart,
					steamRecentGames: recentGames,
				};
			});
	}
};

module.exports.getInfoMain_stream = async (req, res) => {
	const data = await info(steamid, 'stream');
	res.json(data);
};

module.exports.getInfoMain = () => {
	return info(steamid, 'main');
};
