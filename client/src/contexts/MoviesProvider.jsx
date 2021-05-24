import { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = (props) => {
	const [movies, setMovies] = useState([]);

	const fetchAllMovies = async () => {
		let movieData = await fetch("/api/v1/movies");
		movieData = await movieData.json();

		if (movieData.length === 0) {
			console.log("error");
		} else {
			setMovies(movieData);
		}
	};

	const findMovie = (id) => movies.find((movie) => movie._id === id);

	const values = {
		movies,
		findMovie,
		fetchAllMovies,
	};

	return (
		<MovieContext.Provider value={values}>
			{props.children}
		</MovieContext.Provider>
	);
};

export default MovieProvider;
