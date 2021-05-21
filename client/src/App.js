import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieProvider from "./contexts/MovieProvider";
import AboutPage from "./pages/AboutPage"

const App = () => {
	return (
		<div >
			<Router>
				<MovieProvider>
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={AboutPage} />
				</MovieProvider>
			</Router>
		</div>
	);
};

export default App;
