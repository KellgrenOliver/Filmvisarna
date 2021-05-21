const { seatsSeeder } = require("./seats");
const { auditoriumSeeder } = require("./auditorium");
const { movieSeeder } = require("./movie");
const { screeningSeeder } = require("./screening");

async function seeder() {
	await movieSeeder();
	await auditoriumSeeder();
	await seatsSeeder();
	await screeningSeeder();
}

module.exports = {
	seeder,
};
