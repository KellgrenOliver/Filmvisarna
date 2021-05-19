import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Navbar />
			</Router>
		</div>
	);
};

export default App;
