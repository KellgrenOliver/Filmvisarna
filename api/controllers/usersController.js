const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorLog = require("../utils/errorLog");
const Booking = require("../models/Booking");

const whoami = async (req, res) => {
	const { user } = req.session;
	user.bookings = await getBookings(user._id);
	res.status(200).json(user);
};

const logout = (req, res) => {
	if (!req.session.user) {
		return res.status(405).json({ error: "Already logged out" });
	}
	req.session.user = undefined;
	res.status(200).end();
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(422).json({ error: "Bad credentials" });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(422).json({ error: "Bad credentials" });
		}

		user.password = undefined;
		req.session.user = user;
		user.bookings = await getBookings(user);

		return res
			.status(200)
			.json({ success: "Login successfull", loggedInUser: user });
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
};

async function createUser(req, res) {
	const { email, password, phone } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: "Please provide an email and password." });
	}

	try {
		const userExists = await User.exists({ email });

		if (userExists) {
			return res
				.status(422)
				.json({ error: "A user with that email already exists" });
		}

		const user = await User.create({ email, password, phone });
		user.password = undefined;
		user.bookings = await getBookings(user._id);

		res.status(200).json({ success: "User created", createdUser: user });
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getBookings(user) {
	if (!user) user = req.session.user;
	return await Booking.where({ user });
}

module.exports = {
	createUser,
	whoami,
	login,
	logout,
	getBookings,
};
