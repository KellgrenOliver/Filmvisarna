const errorLog = require("../utils/errorLog");
const Auditorium = require("../models/Auditorium");
const Screening = require("../models/Screening");
const Seat = require("../models/Seat");

async function addRelations(auditorium) {
	const seats = await Seat.where({ auditorium: auditorium._id });
	const screenings = await Screening.where({
		auditorium: auditorium._id,
	});
	auditorium.seats = seats;
	auditorium.screenings = screenings;
}

async function getAuditoria(req, res) {
	try {
		const auditoria = await Auditorium.find();

		for (let i = 0; i < auditoria.length; i++) {
			await addRelations(auditoria[i]);
		}

		res.status(200).json(auditoria);
	} catch (e) {
		errorLog(e);
		res.status(500);
	}
}

async function getAuditoriumById(req, res) {
	const { id } = req.params;
	try {
		const auditorium = await Auditorium.findOne({ _id: id });
		await addRelations(auditorium);
		res.status(200).json(auditorium);
	} catch (e) {
		errorLog(e);
		res.status(500);
	}
}

module.exports = {
	getAuditoria,
	getAuditoriumById,
};
