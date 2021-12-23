const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
router.get('/info/stream', async (req, res) => {
	const data = await api.getInfoMain_stream();
	res.json(data);
});
router.get('/info/main', async (req, res) => {
	const data = await api.getInfoMain();
	res.json(data);
});
router.use('/tasks', require('./api/tasks'));
module.exports = router;
