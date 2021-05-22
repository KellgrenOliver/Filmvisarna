const { seatsSeeder } = require("./seats");
const { auditoriumSeeder } = require("./auditorium");
const { movieSeeder } = require("./movie");
const { screeningSeeder } = require("./screening");
const { userSeeder } = require("./user");

async function seeder() {
	await userSeeder();
	await movieSeeder();
	await auditoriumSeeder();
	await seatsSeeder();
	await screeningSeeder();
}

module.exports = {
	seeder,
};
