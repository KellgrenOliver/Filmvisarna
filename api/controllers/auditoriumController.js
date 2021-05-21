const Auditorium = require("../models/Auditorium");
// const User = require("../models/User");

const createAuditorium = async (req, res) => {
    Auditorium.create({
        id: req.body.id
    }).then((doc) => {
        console.log("doc: ", doc);
        res.send("OK");
    }); 
};


module.exports = {
	createAuditorium
};
