const mongoose = require("mongoose");

const conn = process.env.DB_STRING;

const connection = mongoose
	.connect(conn, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log(`[MONGOOSE]: Database Connected.`);
		mongoose.set("useFindAndModify", false);
	})
	.catch((err) => {
		console.log(`Database Error: ${err}`);
	});

module.exports = connection;
