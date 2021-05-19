const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
	screenings: { type: Shema.Types.ObjectId, ref: "Screening" },
	title: { type: String, required: true },
	genre: { type: String, required: true },
	description: { type: String, required: true },
	poster: { type: String, required: true },
	length: { type: Number, required: true },
	trailer: { type: String, required: true },
	age: { type: Number, required: true, default: 18 },
	language: { type: String, required: true },
	subtitles: { type: Boolean, required: true, default: true },
	director: { type: String, required: true },
	cast: { type: Array, required: true },
});

module.exports = mongoose.model("Movie", movieSchema);
