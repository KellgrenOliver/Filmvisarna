import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const MovieProvider = (props) => {
	const [movies, setMovies] = useState([]);
	const [searchedMovies, setSearchedMovies] = useState(null);
	const [message, setMessage] = useState(null);
  const [searchString, setSearchString] = useState ("")
  const [lengthMin, setLengthMin]=useState("?lengthMin=0");
  const [lengthMax, setLengthMax]=useState("");
  const [language, setLanguage]=useState("");

	useEffect(() => {
    // setLengthMin("?lengthMin="+0)
		fetchAllMovies();
	}, []);

  useEffect(() => {
    console.log(message)
    filter()
  }, [searchString, lengthMin, lengthMax, language ]);


	const fetchAllMovies = async () => {
		let movieData = await fetch("/api/v1/movies");
		movieData = await movieData.json();

		if (movieData.length === 0) {
			console.log("error");
		} else {
			setMovies(movieData);
		}
	};

	const filter = async () => {
		let response = await fetch(`/api/v1/movies/filter${lengthMin}${lengthMax}${searchString}${language}`);
		let movieData = await response.json();
		if (response.status === 404) {
			setSearchedMovies([]);
			setMessage(movieData.error);
		} else {
			setSearchedMovies(movieData);
			setMessage(null);
		}
	};

	const findMovie = (id) => movies.find((movie) => movie._id === id);

	const values = {
		movies,
		setMovies,
		findMovie,
		fetchAllMovies,
		filter,
		searchedMovies,
		message,
    setSearchString,
    setLengthMin,
    setLengthMax,
    setLanguage
	};

	return (
		<MovieContext.Provider value={values}>
			{props.children}
		</MovieContext.Provider>
	);
};

export default MovieProvider;
