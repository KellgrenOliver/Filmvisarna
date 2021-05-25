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

function getTicketsPrice(seats = [], standard = 100) {
	return (
		seats?.reduce((total, seat) => {
			if (!seat.type) return total;

			const calculatePrice = (multiplier) => total + standard * multiplier;

			switch (seat.type.toLowerCase()) {
				case "adult":
					return calculatePrice(1);
				case "senior":
					return calculatePrice(0.8);
				case "child":
					return calculatePrice(0.7);
				default:
					return calculatePrice(1);
			}
		}, 0) ?? 0
	);
}

module.exports = {
	seatsSeeder,
	getTicketsPrice,
};
