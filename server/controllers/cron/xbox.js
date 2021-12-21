const userModel = require('../../../models/user-model');
const xblio = require('../../../services/xblio_api_v2');
const xuid = process.env.cl_xuid;
module.exports.syncPlayerSummary = async () => {
	const xboxPlayerSummary = await new xblio.ApiPortal() // xuid not passed here, xblio api uses sv_xblio_apiKey.
		.getPlayerSummary()
		.then((summary) => {
			return summary.people[0];
		})
		.catch((err) => {
			console.log(`[xblio.io API] ${err}`);
		});
	if (xboxPlayerSummary) {
		//console.log(xboxPlayerSummary);
		// Find user with matching xuid
		// Update user.xboxPlayerSummary with playerSummary.
		userModel.findOneAndUpdate({ xuid }, { xboxPlayerSummary }).exec();
	}
};
