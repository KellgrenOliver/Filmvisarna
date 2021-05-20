import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieProvider from "./contexts/MovieProvider";

const App = () => {
	return (
		<div className="App">
			<Router>
				<MovieProvider>
					<Navbar />
					<Route exact path="/" component={Home} />
				</MovieProvider>
			</Router>
		</div>
	);
};

export default App;
