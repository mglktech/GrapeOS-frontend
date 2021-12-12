const CronJobManager = require('cron-job-manager');
const cronTaskModel = require('../../models/crontask-model');
const FiveMController = require('../controllers/cron/fiveM');
const LastFMController = require('../controllers/cron/lastfm');
const SteamController = require('../controllers/cron/steam');
//const db = require("../config/db");

const syncTasks = async () => {
	let tasks = await cronTaskModel.getAll();
	for (let task of tasks) {
		syncTaskToEnabledFlag(task);
	}
};

const syncTaskToEnabledFlag = (task) => {
	if (!manager.exists(task._id.toString())) {
		createTask(task);
		return;
	}
	let id = task._id.toString();
	let running = manager.jobs[id].running || false;
	let enabled = task.enabled;
	if (running == false && enabled == true) {
		manager.jobs[id].start();
		console.log(`CRON Task ${task.name} Started.`);
	}
	if (running == true && enabled == false) {
		manager.jobs[id].stop();
		console.log(`CRON Task ${task.name} Stopped.`);
	}
};

const createTask = async (task) => {
	if (task.cmd == 'pingFiveMServers') {
		FiveMController.resetReadyFlags();
		manager.add(task._id.toString(), task.exp, function () {
			FiveMController.pingFiveMServers();
		});
		console.log(`CRON Task ${task.name} has been created. (${task.cmd})`);
	}
	if (task.cmd == 'syncTopWeeklyTracks') {
		manager.add(task._id.toString(), task.exp, function () {
			LastFMController.syncTopWeeklyTracks();
		});
	}
	if (task.cmd == 'syncCurrentlyPlaying') {
		manager.add(task._id.toString(), task.exp, function () {
			LastFMController.syncCurrentlyPlaying();
		});
	}
	if (task.cmd == 'syncSteamPlayerSummary') {
		manager.add(task._id.toString(), task.exp, function () {
			SteamController.syncUserSummary();
		});
	}
	if (task.cmd == 'syncSteamRecentGames') {
		manager.add(task._id.toString(), task.exp, function () {
			SteamController.syncUserRecentGames();
		});
	}
};

let manager = new CronJobManager('head', '* * * * * *', syncTasks, {
	// Create a Head CRON to run all other jobs
	start: true,
});

module.exports = manager;
