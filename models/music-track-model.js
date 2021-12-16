const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = 'music-track';
const mySchema = new Schema(
	{
		artist: {},
		streamable: String,
		image: [],
		mbid: String,
		album: {},
		name: String,
		url: String,
	},
	{
		timestamps: false,
	}
);
const model = mongoose.model(modelName, mySchema);
module.exports = model;
