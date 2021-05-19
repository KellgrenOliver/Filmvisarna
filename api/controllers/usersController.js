const User = require("../models/User");
const bcrypt = require("bcrypt");

const whoami = (req, res) => {
	return res.json(req.session.user || null);
};

const logout = (req, res) => {
	if (req.session.user) {
		delete req.session.user;
		return res.json({ message: "Logout successfull" });
	}

	return res.json({ error: "Already logged out" });
};

const login = async (req, res) => {
	// Model.exists return true if at least one matching document is found in the collection, otherwise it returns false. It also returns a promise so we can use async/await without .exec().
	let userExists = await User.exists({ email: req.body.email });

	if (userExists) {
		// Model.findOne() always return the first matching document in the collection. It returns a Query object so wee need .exec().
		let user = await User.findOne({ email: req.body.email }).exec();
		// Here we shoud encrypt the password in order to compare the hashed password. We will implement later.
		if (user.password === req.body.password) {
			req.session.user = user;
			req.session.user.password = undefined;
			user.password = undefined;
			return res.json({ message: "Login successfull", loggedInUser: user });
		}
	}

	return res.status(401).json({ error: "Bad credentials" });
};

async function createUser(req, res) {
	// create a user with Mongoose
	let userExists = await User.exists({ email: req.body.email });
	if (userExists) {
		return res
			.status(400)
			.json({ error: "An user with that email already exists" });
	}

	let user = await User.create(req.body);
	user.password = undefined;
	return res.json(user);
}

module.exports = {
	createUser,
	whoami,
	login,
	logout,
};
