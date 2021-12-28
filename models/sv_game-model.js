const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = 'sv_game';
const mySchema = new Schema(
	{
		xblio_presenceText: String,
		igdb_search: [],
	},
	{
		timestamps: false,
	}
);
const model = mongoose.model(modelName, mySchema);
module.exports = model;
