const express = require('express');
const router = express.Router();
const api = require('../controllers/api.js');
router.get('/info/stream', api.getInfoMain_stream);
router.get('/info/main', api.getInfoMain);
router.use('/tasks', require('./api/tasks'));
module.exports = router;
