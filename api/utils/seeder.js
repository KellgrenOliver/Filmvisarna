const { seatsSeeder } = require("./seats");
const { auditoriumSeeder } = require("./auditorium");
const { movieSeeder } = require("./movie");
const { screeningSeeder } = require("./screening");
const { userSeeder } = require("./user");
const errorLog = require("../utils/errorLog");
const { MONGODB_PASSWORD } = require("../../env.json");
const uri = `mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

async function seeder() {
	await userSeeder();
	await movieSeeder();
	await auditoriumSeeder();
	await seatsSeeder();
	await screeningSeeder();
}

async function run() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		await seeder();
		console.log("Seeded database");
	} catch (e) {
		errorLog(e);
	}
}

if (process.argv.includes("run")) {
	run();
}

module.exports = {
	run,
	seeder,
};
