const errorLog = require("./errorLog");
const movies = require("../../movies.json");
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

module.exports = {
	userSeeder,
};
