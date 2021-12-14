const steamController = require('./controllers/cron/steam');
const cronConfig = require('./config/cron');
require('../config/db');
//require('./bin/highlife-dragtimes');
cronConfig.setup();
require('./controllers/cron.js'); // Start running CRON tasks
require('dotenv').config();

//client.getPlayerSummaries().then((result) => console.log(result));
//client.GetOwnedGames().then((result) => console.log(result));
//client.GetRecentlyPlayedGames().then((result) => console.log(result));
// async function updatePlayerModels() {
// 	console.log('Updating Player Models');
// 	const players = await playerModel.find({});
// 	let count = 0;
// 	console.log(`Processing ${players.length} records...`);
// 	for (let player of players) {
// 		// so I don't have to clear activity data this time
// 		count++;
// 		await playerModel
// 			.findByIdAndUpdate(player._id, {
// 				$unset: { server: '' },
// 			})
// 			.exec();
// 		console.log(`${player.name} updated`);
// 	}
// 	console.log(`${count} PlayerModels Updated`);
// }
