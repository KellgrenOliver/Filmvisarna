const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const errorLog = require("./utils/errorLog");
const { PORT, MONGODB_PASSWORD, SESSION_SECRET } = require("../env.json");
const uri = `mongodb+srv://aubameyang:${MONGODB_PASSWORD}@cluster0.rvi3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

// Database connection
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => error && errorLog(error));

// Controllers
const userRoutes = require("./routes/usersRoutes");
const auditoriumRoutes = require("./routes/auditoriumRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const screeningsRoutes = require("./routes/screeningsRoutes");
const { screeningSeeder } = require("./utils/screening");

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
app.use("/api/v1/auditoria", auditoriumRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/bookings", bookingsRoutes);
app.use("/api/v1/screenings", screeningsRoutes);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
