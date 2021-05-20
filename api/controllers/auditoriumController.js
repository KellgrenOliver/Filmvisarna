const Auditorium = require("../models/Auditorium");
// const User = require("../models/User");

const createAuditorium = async (req, res) => {
    Auditorium.create({
        name: req.body.name
    }).then((doc) => {
        console.log("doc: ", doc);
        res.send("OK");
    }); 
};


module.exports = {
	createAuditorium
};
