const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const { PORT, MONGODB_PASSWORD, SESSION_SECRET } = require("../env.json");
const uri = `mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Controller
const userRoutes = require("./routes/usersRoutes");
const auditoriumRoutes = require("./routes/auditoriumRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Middleware
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Database connection
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auditorium", auditoriumRoutes);
app.use("/api/v1/booking", bookingRoutes);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
