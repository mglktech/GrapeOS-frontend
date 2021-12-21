const passport = require('passport');
const service = require('../../services/discord');
const userModel = require('../../models/user-model');
const files = require('../../models/file-model');
let router = require('express').Router();
router.get('/login', passport.authenticate('discord'));
router.get(
	'/redirect',
	passport.authenticate('discord', {
		failureRedirect: '/',
		successRedirect: '/auth/discord/doLogin',
	})
);
router.get('/doLogin', (req, res) => {
	console.log(`[Discord]: User ${req.user.discord.username} has logged in`);
	res.redirect('/admin');
});
// router.get('/doLogin', async (req, res) => {
// 	console.log(`[Discord]: User ${req.user.discord.username} has logged in`);
// 	scs = await files.getShortcuts({
// 		'data.requireAdmin': true,
// 		'data.desktopVisible': true,
// 	});
// 	fds = await files.getFolders({
// 		'data.requireAdmin': true,
// 		'data.desktopVisible': true,
// 	});
// 	let userFiles = scs.concat(fds);
// 	//console.log(userFiles);
// 	await userModel
// 		.findOneAndUpdate(
// 			{ 'discord.id': req.user.discord.id },
// 			{ 'desktop.files': userFiles },
// 			{
// 				new: true,
// 				upsert: true,
// 			}
// 		)
// 		.exec();
// 	res.redirect('/home');
// }); // The users' Discord information is stored by the Strategy, not the redirect.
router.get('/logout', (req, res) => {
	if (req.user) {
		console.log(`[Discord]: User ${req.user.discord.username} has logged out.`);
	}
	req.logout();
	res.redirect('/');
});

module.exports = router;
