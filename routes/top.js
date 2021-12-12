const express = require('express');
const router = express.Router();
const shortcuts = require('../models/shortcut-model');
const files = require('../models/file-model');
const users = require('../models/user-model');
const games = require('../models/steamgame-model');

router.get('/', async (req, res) => {
	// Esentially I would like this req to pull ALL main data from the database at once instead of in seperate requests
	// I can then user this func to render with all data at once
	const data = await users
		.findOne(
			{ steamID: process.env.steamClientID },
			'lastfmWeeklyTrackChart steamRecentGames'
		)
		.lean();
	let recentGames = [];
	if (data.steamRecentGames) {
		for await (game of data.steamRecentGames) {
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
	res.render('pages/main', {
		lastfmWeeklyTrackChart: data.lastfmWeeklyTrackChart,
		steamRecentGames: recentGames,
	});
});
// router.get("/welcome", (req, res) => {
// 	res.render("pages/welcome");
// });
router.get('/login', (req, res) => res.render('pages/loginPreSplash'));
router.get('/home', async (req, res) => {
	let scs = [];
	let fds = [];
	let authRoute = '/auth/discord';
	if (req.isAuthenticated() && req.user.admin) {
		// Collect apps from database belonging to Admin?
		// collect apps based on JS object?
		//console.log(req);

		// scs = await files.getShortcuts({
		// 	'data.requireAdmin': true,
		// 	'data.desktopVisible': true,
		// });
		// fds = await files.getFolders({
		// 	'data.requireAdmin': true,
		// 	'data.desktopVisible': true,
		// });
		authRoute = '/auth/discord/logout';
		scs = req.user.desktop.files || [];
		res.render('desktops/new_default', { scs, authRoute });
		return;
		//console.log(scs);
	}
	res.redirect('/');

	//let finalArray = scs.concat(fds);
	//console.log(finalArray);
	//res.render('desktops/new_default', { scs: finalArray, authRoute });
});

router.get('/folder/:id', async (req, res) => {
	const id = req.params.id;
	const folderFile = await files.getFile({ _id: id });
	let resFiles = [];
	for await (let file of folderFile.data.files) {
		let FileID = file.toString();
		let unpackedFile = await files.getShortcut({ _id: FileID });
		resFiles.push(unpackedFile);
	}
	//console.log(resFiles);
	res.render('pages/folder', { scs: resFiles });
});

router.get('/home/public', async (req, res) => {
	let scs = await files.getShortcuts({
		'data.requireAuth': false,
		'data.desktopVisible': true,
	});
	let fds = await files.getFolders({
		'data.requireAuth': false,
		'data.desktopVisible': true,
	});
	let authRoute = '/auth/discord';
	let finalArray = scs.concat(fds);

	res.render('desktops/new_default', { scs: finalArray, authRoute });
});

router.get('/about', (req, res) => {
	res.render('pages/about');
});

module.exports = router;
