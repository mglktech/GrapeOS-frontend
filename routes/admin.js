const express = require('express');
const router = express.Router();
const crons = require('../models/crontask-model');
const sv_games = require('../models/sv_game-model');
router.get('/', async (req, res) => {
	if (req.isAuthenticated() && req.user.admin) {
		// Collect CRON info and send it to the page
		const cronTasks = await crons.find();
		const gamesWithNoInfo = await sv_games.find(
			{
				igdb_search: { $exists: false },
			},
			'_id'
		);
		console.log(gamesWithNoInfo);
		res.render('pages/admin', { cronTasks, gamesWithNoInfo });
		return;
	}
	res.render('pages/noAccess');
});
module.exports = router;
