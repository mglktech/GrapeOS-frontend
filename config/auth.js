module.exports.isAuth = async (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}
	console.log(
		"A User tried to load a page that was Auth restricted. Their session details are as follows: "
	);
	console.log(req.session);
	res.redirect("/auth/login");
};
module.exports.isAdmin = async (req, res, next) => {
	if (req.isAuthenticated() && isAdmin(req.user)) {
		next();
		return;
	}
	console.log(
		"A User tried to load a page that was Admin restricted. Their session details are as follows: "
	);
	res
		.status(404)
		.send(
			"You are not authorised to view this content. (you are not an admin)"
		);
};
const isAdmin = (user) => {
	const AdminRoleID = process.env.GrapeOSSuperUserRoleID;
	//console.log(user);
	return true;
};
