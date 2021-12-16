const lastfmclient = require('lastfm-node-client');
const lastfm = new lastfmclient(process.env.lastfm_api_key);
const userModel = require('../../../models/user-model');
const musicTrackModel = require('../../../models/music-track-model');

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
		.then((data) => {
			//console.log(data.weeklytrackchart);
			return data.weeklytrackchart;
		})
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
	musicTrackModel
		.findOneAndUpdate({ mbid: lastfmRecentTrack.mbid }, lastfmRecentTrack, {
			upsert: true,
		})
		.exec();
	userModel.findOneAndUpdate({ lastfmUser }, { lastfmRecentTrack }).exec();
};

module.exports.syncTopWeeklyTracks = async () => {
	let weeklyTrackChart = await GetWeeklyTrackChart();
	//console.log(weeklyTrackChart);
	let lastfmUser = weeklyTrackChart['@attr'].user;
	//console.log(lastfmUser);
	let lastfmWeeklyTrackChart = weeklyTrackChart.track;
	for (const [k, v] of weeklyTrackChart.track.entries()) {
		// LastFM fills image array with placeholders. This loop collects images from my database instead.
		//console.log(v);
		const foundTrack = await musicTrackModel
			.findOne({ mbid: v.mbid }, 'image')
			.lean();
		if (foundTrack) {
			//console.log(foundTrack);
			lastfmWeeklyTrackChart[k].image = foundTrack.image;
		}
	}
	// take this lastfmWeeklyTrackChart apart, replace image array with found song in database
	//console.log(lastfmWeeklyTrackChart);
	userModel.findOneAndUpdate({ lastfmUser }, { lastfmWeeklyTrackChart }).exec();
};
