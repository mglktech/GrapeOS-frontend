const api = require('./api');
module.exports.loadMain = async (req, res) => {
	const data = await api.getInfoMain();
	res.render('pages/main', data);
};
