const User = require("../models/User");
const bcrypt = require("bcrypt");
const { db } = require("../models/User");


const whoami = (req, res) => {
	res.json(req.session.user || null);
};

const logout = (req, res) => {
	if (req.session.user) {
		delete req.session.user;
		return res.json({ message: "Logout successfull" });
	}

	res.json({ error: "Already logged out" });
};

const login = async (req, res) => {
	let userExists = await User.exists({ email: req.body.email });
	if (userExists) {
		let user = await User.findOne({ email: req.body.email });
		const match = await bcrypt.compare(req.body.password, user.password);
		if (match) {
			req.session.user = user;
			req.session.user.password = undefined;
			user.password = undefined;
			return res.json({ success: "Login successfull", loggedInUser: user });
		}
	}
	res.status(422).json({ error: "Bad credentials" });
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
	res.json({ success: "User created", createdUser: user });
}

const update = (req, res) => {
	const user = req.body;

	// update database



	
	res.json({ success: "User updated", updatedUser: user });
}




module.exports = {
	createUser,
	whoami,
	login,
	logout,
	update
};
