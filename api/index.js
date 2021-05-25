const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const errorLog = require("./utils/errorLog");
const { PORT, MONGODB_PASSWORD, SESSION_SECRET } = require("../env.json");
const uri = `mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const { seeder } = require("./utils/seeder");

// Database connection
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => error && errorLog(error));

// Controllers
const userRoutes = require("./routes/usersRoutes");
const auditoriumRoutes = require("./routes/auditoriumRoutes");
const seatRoutes = require("./routes/seatRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
<<<<<<< HEAD
const { sensitiveHeaders } = require("http2");
const bookingsRoutes = require("./routes/bookingsRoutes");
=======
>>>>>>> dev

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auditorium", auditoriumRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/bookings", bookingsRoutes);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
