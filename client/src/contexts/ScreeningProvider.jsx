import { createContext, useState, useEffect } from "react";

export const ScreeningContext = createContext();

const ScreeningProvider = (props) => {
	const [movieScreenings, setMovieScreenings] = useState([]);
	const [filteredMovieScreenings, setFilteredMovieScreenings] = useState(null);
	const [screenings, setScreenings] = useState([]);
	const [screening, setScreening] = useState(null);
	const [priceMin, setPriceMin] = useState("?priceMin=0");
	const [priceMax, setPriceMax] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [filterMovieId, setFilterMovieId] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		getScreenings();
	}, []);

	useEffect(() => {
		if (filterMovieId) {
			getScreeningsFromMovieByFilter();
		}
	}, [priceMin, priceMax, startDate, endDate, filterMovieId]);

	const getScreenings = async () => {
		let screenings = await fetch("/api/v1/screenings");
		screenings = await screenings.json();
		setScreenings(screenings);
	};

	const getScreeningsFromMovie = async (movieId) => {
		let movieScreenings = await fetch(`/api/v1/screenings/movie/${movieId}`);
		movieScreenings = await movieScreenings.json();
		setMovieScreenings(movieScreenings);
	};

	const getScreeningsFromMovieByFilter = async () => {
		try {
			let respons = await fetch(
				`/api/v1/screenings/filter/${filterMovieId}${priceMin}${priceMax}${startDate}${endDate}`
			);
			let filterScreenings = await respons.json();
			if (respons.status === 404) {
				setFilteredMovieScreenings([]);
				setMessage(filterScreenings.error);
			} else if (respons.status === 500) {
				setFilteredMovieScreenings(null);
			} else if (respons.status === 200) {
				setMessage(null);
				setFilteredMovieScreenings(filterScreenings);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getScreeningById = async (screeningId) => {
		const response = await fetch(`/api/v1/screenings/${screeningId}`);
		return await response.json();
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
		filteredMovieScreenings,
		getScreeningsFromMovieByFilter,
		priceMin,
		setPriceMin,
		priceMax,
		setPriceMax,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		setFilterMovieId,
		message,
	};

	return (
		<ScreeningContext.Provider value={values}>
			{props.children}
		</ScreeningContext.Provider>
	);
};

export default ScreeningProvider;
