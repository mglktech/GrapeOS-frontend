const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = 'steam-game';
const mySchema = new Schema(
	{
		appID: Number,
		name: String,
		logoURL: String,
		iconURL: String,
		gameDetails: {},
	},
	{
		timestamps: false,
	}
);
const model = mongoose.model(modelName, mySchema);
module.exports = model;
