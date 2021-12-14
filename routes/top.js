const express = require('express');
const router = express.Router();
const shortcuts = require('../models/shortcut-model');
const files = require('../models/file-model');
const users = require('../models/user-model');
const games = require('../models/steamgame-model');
const controller = require('../controllers/top');
router.get('/', controller.loadMain);
// router.get("/welcome", (req, res) => {
// 	res.render("pages/welcome");
// });
router.get('/login', (req, res) => res.render('pages/loginPreSplash'));
router.get('/admin', (req, res) => {
	if (req.isAuthenticated() && req.user.admin) {
		res.render('pages/admin');
		return;
	}
	res.sendStatus(404);
});

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
