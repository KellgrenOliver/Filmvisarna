const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true, min: 6, max: 10 },
	phone: { type: Number, required: true },
	bookings: [{ type: Schema.Types.ObjectId, ref: "Booking", required: true }],
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, 10, (err, passwordHash) => {
		if (err) return next(err);
		this.password = passwordHash;
	});
});

const User = mongoose.model("User", userSchema);

module.exports = User;
