import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Home from "./pages/Home";
import UserProvider from "./contexts/UserProvider";
import AboutPage from "./pages/AboutPage";
import MoviePage from "./pages/MoviePage";
import MoviesProvider from "./contexts/MoviesProvider";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
	return (
		<div>
			<Router>
				<MoviesProvider>
					<UserProvider>
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route exact path="/movie/:movieId" component={MoviePage} />
						<Route exact path="/about" component={AboutPage} />
						<Route exact path="/profile" component={ProfilePage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/createUser" component={CreateUser} />
					</UserProvider>
				</MoviesProvider>
			</Router>
		</div>
	);
};

export default App;
