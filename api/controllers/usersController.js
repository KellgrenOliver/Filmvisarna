const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorLog = require("../utils/errorLog");
const Booking = require("../models/Booking");
const { validateBody } = require("../utils/validation");

const whoami = async (req, res) => {
	try {
		const user = await User.findById(req.session.user._id);
		user.bookings = await getBookings(user._id);
		res.status(200).json(user);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
};

const logout = (req, res) => {
	if (!req.session.user) {
		return res.status(405).json({ error: "Already logged out" });
	}
	req.session.user = undefined;
	res.status(200).end();
};

async function userExists({ email, phone }) {
	return (await User.countDocuments({ $or: [{ email }, { phone }] })) > 0;
}

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User does not exist." });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(422).json({ error: "Bad credentials." });
		}

		user.password = undefined;
		req.session.user = user;
		user.bookings = await getBookings(user);

		res.status(200).json({ success: "Login successfull", loggedInUser: user });
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
};

async function createUser(req, res) {
	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Please fill all the fields." });
	}

	const { email, phone, password } = req.body;

	try {
		if (userExists({ email, phone })) {
			return res.status(422).json({
				error: "A user with that email or phone number already exists",
			});
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

async function editUser(req, res) {
	if (
		!validateBody(req.body, ["email", "phone", "oldPassword", "newPassword"])
	) {
		return res.status(400).json({ error: "Please fill all the fields." });
	}

	const { email, phone, oldPassword, newPassword } = req.body;
	const userId = req.session.user._id;

	try {
		if (req.session.user._id !== req.params.id) {
			return res.status(403).end();
		}

		const user = await User.findById(userId);
		const match = await bcrypt.compare(oldPassword, user.password);

		if (!match) return res.status(401).end();

		if (await userExists({ email, phone })) {
			return res
				.status(422)
				.json({ error: "Email and phone number must not be taken." });
		}

		const updatedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUser = await User.updateOne({
			email,
			password: updatedPassword,
			phone,
		});
		updatedUser.password = undefined;

		res.status(200).json(updatedUser);
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
	editUser,
};
