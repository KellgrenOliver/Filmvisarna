const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, MONGODB_PASSWORD } = require("../env.json");

mongoose
	.connect(
		`mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
	)
	.then(() => console.log("Connected to MongoDB"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
