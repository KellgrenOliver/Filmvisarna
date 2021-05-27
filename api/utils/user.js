const errorLog = require("./errorLog");
const User = require("../models/User");

async function userSeeder() {
	try {
		await User.createCollection();
		await User.collection.drop();
		await User.create({
			email: "test@test.com",
			password: "123123",
			phone: 1234567890,
		});
	} catch (e) {
		errorLog(e);
	}
}

async function getBookings(user) {
	if (!user) user = req.session.user;
	return await Booking.where({ user });
}

async function userExists({ email, phone }) {
	return (await User.countDocuments({ $or: [{ email }, { phone }] })) > 0;
}

module.exports = {
	userSeeder,
	userExists,
	getBookings,
};
