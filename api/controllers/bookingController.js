const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
	Booking.create({
		id: req.body.id,
	}).then((doc) => {
		console.log("doc: ", doc);
		res.send("Done!");
	});
};

module.exports = {
	createBooking,
};
