import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import MoviesProvider from "./contexts/MoviesProvider";

const App = () => {
	return (
		<div className="App">
			<Router>
				<MoviesProvider>
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route exact path="/movie/:movieId" component={MoviePage} />
				</MoviesProvider>
			</Router>
		</div>
	);
};

export default App;
