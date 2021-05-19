async function createUser(req, res) {
	// create a user with Mongoose
	res.send("Sent from createUser function");
}

module.exports = {
	createUser,
};
