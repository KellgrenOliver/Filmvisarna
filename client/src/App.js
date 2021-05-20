import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";
import MovieProvider from "./contexts/MovieProvider";

const App = () => {
	return (
		<div className="App">
			<Router>
				<MovieProvider>
					<Navbar />
					<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				</MovieProvider>
			</Router>
		</div>
	);
};

export default App;
