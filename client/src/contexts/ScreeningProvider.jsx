import { createContext, useState, useEffect } from "react";

export const ScreeningContext = createContext();

const ScreeningProvider = (props) => {
	const [movieScreenings, setMovieScreenings] = useState([]);
	const [screenings, setScreenings] = useState([]);
	const [screening, setScreening] = useState(null);

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

	const getScreeningById = async (screeningId) => {
		let screening = await fetch(`/api/v1/screenings/${screeningId}`);
		screening = await screening.json();
		setScreening(screening);
	};

	const values = {
		screenings,
		getScreeningById,
		setScreenings,
		getScreeningsFromMovie,
		setMovieScreenings,
		movieScreenings,
		screening,
		setScreening,
	};

	return (
		<ScreeningContext.Provider value={values}>
			{props.children}
		</ScreeningContext.Provider>
	);
};

export default ScreeningProvider;