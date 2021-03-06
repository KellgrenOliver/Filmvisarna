const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorLog = require("../utils/errorLog");
const { validateBody } = require("../utils/validation");
const {
	userExists,
	getBookings,
	validateEmail,
	validatePassword,
} = require("../utils/user");

const whoami = async (req, res) => {
	if (!req.session.user) return res.status(401).end();
	try {
		const user = await User.findById(req.session.user._id);
		user.password = undefined;

		user.bookings = await getBookings(user._id);
		user.password = undefined;
		res.status(200).json(user);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
};

const logout = (req, res) => {
	if (!req.session.user) {
		return res.status(405).json({ error: "You are already logged out." });
	}
	req.session.user = undefined;
	res.status(200).json({ success: "Logout successful." });
};

const login = async (req, res) => {
	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	const { email, password } = req.body;

	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Please fill all the fields." });
	}

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

		user.bookings = await getBookings(user._id);

		res.status(200).json({ success: true, loggedInUser: user });
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
};

async function register(req, res) {
	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Please fill all the fields." });
	}

	const { email, phone, password } = req.body;

	if (!validateEmail(email)) {
		return res.status(422).json({ error: "Invalid email." });
	}

	const errors = validatePassword(password);
	if (errors.length > 0) {
		return res.status(422).json({ error: errors[0] });
	}

	try {
		if (await userExists({ email, phone })) {
			return res.status(422).json({
				error: "A user with that email or phone number already exists.",
			});
		}

		const user = await User.create({ email, password, phone });

		user.password = undefined;
		req.session.user = user;

		user.bookings = await getBookings(user._id);

		res.status(200).json({ success: "User created", createdUser: user });
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function update(req, res) {
	if (!validateBody(req.body, ["oldPassword"])) {
		return res.status(400).json({ error: "Please fill all the fields." });
	}

	const { email, phone, oldPassword, newPassword } = req.body;
	const { id } = req.params;
	const userId = req.session.user._id;

	if (email && !validateEmail(email)) {
		return res.status(422).json({ error: "Invalid email." });
	}

	try {
		if (String(userId).toLowerCase() !== String(id).toLowerCase()) {
			return res.status(403).end();
		}

		const user = await User.findById(userId);
		const match = await bcrypt.compare(oldPassword, user.password);

		if (!match) return res.status(401).end();

		if (email && (await User.exists({ email }))) {
			return res.status(422).json({ error: "Email must not be taken." });
		} else if (phone && (await User.exists({ phone }))) {
			return res.status(422).json({ error: "Phone number must not be taken." });
		}

		const data = {};

		if (email && email !== user.email) data.email = email;
		if (phone && phone !== user.phone) data.phone = phone;
		if (newPassword) data.password = await bcrypt.hash(newPassword, 10);

		await User.findByIdAndUpdate(id, data);

		user.password = undefined;
		data.password = undefined;
		req.session.user = user;

		res.status(200).json(Object.assign(user, data));
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

module.exports = {
	register,
	whoami,
	login,
	logout,
	update,
};
