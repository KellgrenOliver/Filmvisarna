const Auditorium = require("../models/Auditorium");
const Seat = require("../models/Seat");
const errorLog = require("./errorLog");
const seats = require("../../seats.json");
const Booking = require("../models/Booking");

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
	if (!seats) return 0;
	return seats.reduce((total, seat) => {
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
	}, 0);
}

async function getBookedSeats(screening) {
	try {
		const bookings = await Booking.where({ screening: screening._id }).populate(
			"seats"
		);

		const seats = new Set();
		bookings.forEach((booking) => {
			booking.seats.forEach((seat) => {
				seats.add(seat);
			});
		});
		return [...seats];
	} catch (e) {
		errorLog(e);
		return [];
	}
}

module.exports = {
	seatsSeeder,
	getTicketsPrice,
	getBookedSeats,
};
