const Auditorium = require("../models/Auditorium");
const Seat = require("../models/Seat");
const errorLog = require("./errorLog");
const seats = require("../../seats.json");

async function createStandardSeats() {
	try {
		if (!seats?.length) {
			throw new Error(`Expected seats, got ${JSON.stringify(seats)}`);
		}

		Seat.collection.drop();

		for (let i = 0; i < seats.length; i++) {
			const { _id: auditorium } = await Auditorium.findOne().skip(i);
			const result = seats[i].map((seat) => ({ ...seat, auditorium }));
			Seat.insertMany(result);
		}
	} catch (e) {
		errorLog(e);
	}
}

module.exports = {
	createStandardSeats,
};
