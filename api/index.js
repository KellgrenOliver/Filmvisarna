const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const { PORT, MONGODB_PASSWORD, SESSION_SECRET } = require("../env.json");

// Controller
const userRoutes = require("./routes/usersRoutes");
const seatRoutes = require("./routes/seatRoutes");
// Middleware
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/v1/seats", seatRoutes);
mongoose
	.connect(
		`mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
	)
	.then(() => console.log("Connected to MongoDB"));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
