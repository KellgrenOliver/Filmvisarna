const errorLog = require("./errorLog");
const User = require("../models/User");
const Booking = require("../models/Booking");

async function userSeeder() {
	try {
		await User.createCollection();
		await User.collection.drop();
		await User.create({
			email: "test@test.com",
			password: "123123",
			phone: "1234567890",
		});
	} catch (e) {
		errorLog(e);
	}
}

async function getBookings(user) {
	if (!user) user = req.session.user;
	return await Booking.where({ user }).populate([
		"auditorium",
		"screening",
		"seats"]);
}

async function userExists({ email, phone }) {
	return (await User.countDocuments({ $or: [{ email }, { phone }] })) > 0;
}

function validateEmail(email) {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

module.exports = {
	userSeeder,
	userExists,
	getBookings,
	validateEmail,
};
