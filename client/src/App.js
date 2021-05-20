import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Route exact path="/login" component={Login} />
			</Router>
		</div>
	);
};

export default App;
