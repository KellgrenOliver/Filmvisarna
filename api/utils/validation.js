function validateBody() {
	if (body == null || keys == null) {
		return false;
	}

	body = Object.keys(body).sort();
	keys = keys.sort();

	if (body.length !== keys.length) {
		console.log("did not match");
		return false;
	}

	for (let i = 0; i < body.length; ++i) {
		if (body[i] !== keys[i]) return false;
	}

	return true;
}

module.exports = {
	validateBody,
};
