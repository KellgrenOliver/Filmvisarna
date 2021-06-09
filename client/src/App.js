import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Home from "./pages/Home";
import UserProvider from "./contexts/UserProvider";
import AboutPage from "./pages/AboutPage";
import MoviePage from "./pages/MoviePage";
import TicketPage from "./pages/TicketPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import MoviesProvider from "./contexts/MoviesProvider";
import ScreeningProvider from "./contexts/ScreeningProvider";
import BookingProvider from "./contexts/BookingProvider";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
	return (
		<div>
			<Router>
				<BookingProvider>
					<ScreeningProvider>
						<MoviesProvider>
							<UserProvider>
								<Navbar />
								<Route exact path="/" component={Home} />
								<Route exact path="/movie/:movieId" component={MoviePage} />
								<Route exact path="/about" component={AboutPage} />
								<Route exact path="/profile" component={ProfilePage} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/createUser" component={CreateUser} />
								<Route
									exact
									path="/ticket/:movieId/:screeningId/:auditoriumId"
									component={TicketPage}
								/>
								<Route
									path="/booking/:bookingId"
									component={ConfirmationPage}
								/>
							</UserProvider>
						</MoviesProvider>
					</ScreeningProvider>
				</BookingProvider>
			</Router>
		</div>
	);
};

export default App;
