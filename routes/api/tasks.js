let router = require('express').Router();
const isAdmin = require('../../config/auth').isAdmin;
const cron = require('../../models/crontask-model');

router.get('/toggle/:id', isAdmin, async (req, res) => {
	await cron.toggle(req.params.id);
	res.redirect('/admin');
});
module.exports = router;
