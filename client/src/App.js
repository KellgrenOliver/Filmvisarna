import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";
import MovieProvider from "./contexts/MovieProvider";
import UserProvider from "./contexts/UserProvider";
import AboutPage from "./pages/AboutPage";

const App = () => {
	return (
		<div>
			<Router>
				<MovieProvider>
					<UserProvider>
						<Navbar />
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={AboutPage} />
						<Route exact path="/login" component={Login} />
					</UserProvider>
				</MovieProvider>
			</Router>
		</div>
	);
};

export default App;
