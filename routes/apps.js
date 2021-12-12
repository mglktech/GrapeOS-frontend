const router = require('express').Router();

router.use('/serverStatus', require('./apps/serverStatus'));
router.use('/spotify', require('./apps/spotify'));

module.exports = router;
