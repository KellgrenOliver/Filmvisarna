const Auditorium = require("../models/Auditorium");
const Seat = require("../models/Seat");
const errorLog = require("./errorLog");
const seats = require("../../seats.json");

async function seatsSeeder() {
	try {
		if (!seats?.length) {
			throw new Error(`Expected seats, got ${JSON.stringify(seats)}`);
		}

		await Seat.createCollection();
		await Seat.collection.drop();

		for (let i = 0; i < seats.length; i++) {
			const { _id: auditorium } = await Auditorium.findOne().skip(i);
			const result = seats[i].map((seat) => ({ ...seat, auditorium }));
			await Seat.insertMany(result);
		}
	} catch (e) {
		errorLog(e);
	}
}

function calculatePrice(seats = [], standard = 100) {
	return seats.reduce((total, seat) => {
		if (!seat.type) return total;
		switch (seat.type.toLowerCase()) {
			case "adult":
				return total + standard * 1;
			case "senior":
				return total + standard * 0.8;
			case "child":
				return total + standard * 0.7;
			default:
				return total + standard * 1;
		}
	}, 0);
}

module.exports = {
	seatsSeeder,
	calculatePrice,
};
