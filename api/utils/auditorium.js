const errorLog = require("./errorLog");
const auditoriums = require("../../auditoriums.json");
const Auditorium = require("../models/Auditorium");

async function auditoriumSeeder() {
	try {
		if (!auditoriums?.length) {
			throw new Error(
				`Expected auditoriums, got ${JSON.stringify(auditoriums)}`
			);
		}
		await Auditorium.createCollection();
		await Auditorium.collection.drop();
		await Auditorium.insertMany(auditoriums);
	} catch (e) {
		errorLog(e);
	}
}

module.exports = {
	auditoriumSeeder,
};
