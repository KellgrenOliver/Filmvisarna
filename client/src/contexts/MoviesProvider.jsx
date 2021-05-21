import { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = (props) => {
	const [movies, setMovies] = useState([]);
	const [singleMovie, setSingleMovie] = useState(false);

	const fetchAllMovies = async () => {
		let movieData = await fetch("/api/v1/movies");
		movieData = await movieData.json();

		if (movieData.length === 0) {
			console.log("error");
		} else {
			setMovies(movieData);
		}
	};

	const fetchMovieById = async (movieId) => {
		let singleMovie = await fetch(`/api/v1/movies/${movieId}`);
		singleMovie = await singleMovie.json();

		if (!singleMovie) {
			console.log("error");
		} else {
			setSingleMovie(singleMovie);
		}
	};

	const values = {
		movies,
		singleMovie,
		fetchAllMovies,
		fetchMovieById,
	};

	return (
		<MovieContext.Provider value={values}>
			{props.children}
		</MovieContext.Provider>
	);
};

export default MovieProvider;
