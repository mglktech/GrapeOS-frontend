const cronTaskModel = require('../../models/crontask-model');

// This script is for setting up default CRON tasks.
// a CRON task is only added to the database through this script if it does not exist already, based on it's cmd.

const steam_playerSummary = {
	module: 'Steam',
	title: 'Player Summary',
	desc: 'Controls synchronization of Steam Player Information',
	cmd: 'steam_syncPlayerSymmary',
	data: {}, // TODO, will allow for multiple accounts to be synchronised independantly.
	exp: '*/60 * * * * *',
	enabled: false, // do NOT automatically enable this task
};

const steam_recentGames = {
	module: 'Steam',
	title: 'Recent Games',
	desc: "Controls syncronization of your steam account's recently played games",
	cmd: 'steam_syncRecentGames',
	data: {},
	exp: '*/60 * * * * *',
	enabled: false,
};

const spotify_nowPlaying = {
	module: 'Spotify',
	title: 'Now Playing',
	desc: "Controls synchonization of your Spotify API's currently playing song.",
	cmd: 'spotify_syncNowplaying',
	data: {},
	exp: '*/5 * * * * *',
	enabled: false,
};

const spotify_topTracks = {
	module: 'Spotify',
	title: 'Top Tracks',
	desc: "Controls synchronization of your Spotify API's Top Tracks.",
	cmd: 'spotify_syncTopTracks',
	data: {},
	exp: '*/60 * * * * *',
	enabled: false,
};

const defaultCrons = [
	steam_playerSummary,
	steam_recentGames,
	spotify_nowPlaying,
	spotify_topTracks,
];

module.exports.setup = () => {
	defaultCrons.forEach(async (cron) => {
		const task = await cronTaskModel.findOne({ cmd: cron.cmd });
		if (!task) {
			new cronTaskModel(cron).save();
			console.log(
				`Default Task [${cron.module}] ${cron.title} was not detected. This may be because the database entry was cleared. This has been rectified.`
			);
		}
	});
};
