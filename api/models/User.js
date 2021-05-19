const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Encrypt = require("../Encrypt");

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	password: { type: Number, required: true },
});

userSchema.pre("save", async function (next) {
	console.log("Inside mongoose middleware, this: ", this);
	this.password = Encrypt.encrypt(this.password);
	return next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
