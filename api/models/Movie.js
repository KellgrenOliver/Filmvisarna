const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
	{
		screenings: [
			{ type: Schema.Types.ObjectId, ref: "Screening", required: true },
		],
		title: { type: String, required: true },
		genres: { type: Array, required: true },
		description: { type: String, required: true },
		poster: { type: String, required: true },
		length: { type: Number, required: true },
		trailer: { type: String, required: true },
		year: { type: Number, required: true },
		rating: { type: String, required: true, default: "PG13" },
		language: { type: String, required: true, default: "English" },
		subtitles: { type: Boolean, required: true, default: true },
		directors: { type: Array, required: true },
		cast: { type: Array, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
