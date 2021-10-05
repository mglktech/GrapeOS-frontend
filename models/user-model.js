const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// make schema, defines structure
const userSchema = new Schema(
	{
		discord: {
			id: String,
			username: String,
			avatar: String,
			discriminator: String,
			public_flags: Number,
			flags: Number,
			banner: String,
			banner_color: String,
			accent_color: String,
			locale: String,
			mfa_enabled: Boolean,
			provider: String,
			accessToken: String,
			guilds: [
				{
					id: String,
					name: String,
					icon: String,
					owner: Boolean,
					permissions: Number,
					features: [String],
					permissions_new: String,
				},
			],
		},
		admin: Boolean,
	},
	{
		timestamps: true,
	}
);

// create model based on schema
const User = mongoose.model("User", userSchema);

User.setup = async () => {
	// Keeping here in case I need to setup any default users again
};

module.exports = User;
