const users = require("../models/user-model");
const files = require("../models/file-model");

module.exports.setup = async () => {
	await users.setup();
	await files.setup(); // File/folder structure needs to be ensured on init in case any of the defaults have changed.
};
