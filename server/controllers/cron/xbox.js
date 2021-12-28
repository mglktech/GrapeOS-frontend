const userModel = require('../../../models/user-model');
const sv_gameModel = require('../../../models/sv_game-model');
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
		if (
			xboxPlayerSummary.presenceState == 'Online' &&
			xboxPlayerSummary.presenceText != 'Online' // IE: if a status has been set while i'm online and it's not the default "Online"
		) {
			console.log(
				`Updating sv_gameModel with ${xboxPlayerSummary.presenceText}` // Tell the console a new status has been found
			);
			sv_gameModel // Upsert playerSummary presence text into sv_gameModel under the key xblio_presenceText
				.findOneAndUpdate(
					{ xblio_presenceText: xboxPlayerSummary.presenceText },
					{ xblio_presenceText: xboxPlayerSummary.presenceText },
					{ upsert: true }
				)
				.exec();
		}
	}
};
