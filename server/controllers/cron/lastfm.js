const lastfmclient = require('lastfm-node-client');
const lastfm = new lastfmclient(process.env.lastfm_api_key);
const userModel = require('../../../models/user-model');

const getRecentTrack = () => {
	return lastfm
		.userGetRecentTracks({
			user: process.env.lastfm_user,
			limit: 1,
		})
		.then((data) => data.recenttracks)
		.catch((err) => console.log(`LastFM API Error: ${err}`));
};

const GetWeeklyTrackChart = () => {
	return lastfm
		.userGetWeeklyTrackChart({
			user: process.env.lastfm_user,
			limit: 10,
		})
		.then((data) => data.weeklytrackchart)
		.catch((err) => console.log(`LastFM API Error: ${err}`));
};

module.exports.syncCurrentlyPlaying = async () => {
	let recentTrack = await getRecentTrack();
	//console.log(recentTrack);
	if (!recentTrack) {
		return;
	}
	let lastfmUser = recentTrack['@attr'].user;
	//console.log(lastfmUser);
	let lastfmRecentTrack = recentTrack.track[0];
	//console.log(lastfmRecentTrack);
	//const user = await userModel.find({ lastfmUser });
	userModel.findOneAndUpdate({ lastfmUser }, { lastfmRecentTrack }).exec();
};

module.exports.syncTopWeeklyTracks = async () => {
	let weeklyTrackChart = await GetWeeklyTrackChart();
	//console.log(weeklyTrackChart);
	let lastfmUser = weeklyTrackChart['@attr'].user;
	//console.log(lastfmUser);
	let lastfmWeeklyTrackChart = weeklyTrackChart.track;
	//console.log(lastfmWeeklyTrackChart);
	userModel.findOneAndUpdate({ lastfmUser }, { lastfmWeeklyTrackChart }).exec();
};
