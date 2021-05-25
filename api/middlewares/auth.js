module.exports = function (req, res, next) {
	if (req.session.user) next();
	res.status(401).end();
};
