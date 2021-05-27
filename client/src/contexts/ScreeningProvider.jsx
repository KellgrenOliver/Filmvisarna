import { createContext, useState, useEffect } from "react";

export const ScreeningContext = createContext();

const ScreeningProvider = (props) => {
	const [movieScreenings, setMovieScreenings] = useState([]);
	const [screenings, setScreenings] = useState([]);

	useEffect(() => {
		getScreenings();
	}, []);

	const getScreenings = async () => {
		let screenings = await fetch("/api/v1/screenings");
		screenings = await screenings.json();
		setScreenings(screenings.screenings);
	};

	const getScreeningsFromMovie = async (movieId) => {
		let movieScreenings = await fetch(`/api/v1/screenings/movie/${movieId}`);
		movieScreenings = await movieScreenings.json();
		setMovieScreenings(movieScreenings);
	};

	const getScreeningById = (id) =>
		screenings.find((screening) => screening._id === id);

	const values = {
		screenings,
		getScreeningById,
		setScreenings,
		getScreeningsFromMovie,
		setMovieScreenings,
		movieScreenings,
	};

	return (
		<ScreeningContext.Provider value={values}>
			{props.children}
		</ScreeningContext.Provider>
	);
};

export default ScreeningProvider;
