module.exports.setup = async () => {
	console.log(`Setup Started.`);
	// This section is for running functions on first time load, to ensure database updates etc.
	console.log(`Setup Complete.`);
};
require('../config/db');
require('./bin/highlife-dragtimes');
require('./config/cron.js'); // Start running CRON tasks

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
