import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Search from "./Search";
import Length from "./Length";
import Items from "./Items";
import styles from "../css/FilterGroup.module.css";

const FilterGroup = () => {
	const {
		setLengthMin,
		setLengthMax,
		setLanguage,
		setGenre,
		setDirector,
		setStar,
		setRating,
		movies,
	} = useContext(MovieContext);
	const [languageItems, setLanguageItems] = useState("");
	const [genreItems, setGenreItems] = useState("");
	const [directorItems, setDirectorItems] = useState("");
	const [starItems, setStarItems] = useState("");
	const [ratingItems, setRatingItems] = useState("");

	useEffect(() => {
		if (movies) {
			getLanguageItems();
			getGenreItems();
			getDirectorItems();
			getStarItems();
			getRatingItems();
		}
		return () => {
			setLanguage("");
			setGenre("");
			setDirector("");
			setStar("");
			setRating("");
			setLengthMin(`?lengthMin=` + 0);
			setLengthMax(`&lengthMax=` + Infinity);
		};
	}, [movies]);

	const getLanguageItems = () => {
		let values = movies.map((movie) => movie.language);
		setLanguageItems([...new Set(values)]);
	};

	const getGenreItems = () => {
		let values = movies.map((movie) => movie.genres);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setGenreItems([...new Set(result)]);
	};

	const getDirectorItems = () => {
		let values = movies.map((movie) => movie.directors);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setDirectorItems([...new Set(result)]);
	};

	const getStarItems = () => {
		let values = movies.map((movie) => movie.stars);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setStarItems([...new Set(result)]);
	};

	const getRatingItems = () => {
		let value = movies.map((movie) => movie.rating);
		setRatingItems([...new Set(value)]);
	};

	return (
		<div className={styles.groupContainer}>
			<div className={styles.filterContainer}>
				<Length setLengthMin={setLengthMin} setLengthMax={setLengthMax} />
				<Items setVal={setLanguage} name={"language"} items={languageItems} />
				<Items setVal={setGenre} name={"genres"} items={genreItems} />
				<Items setVal={setDirector} name={"directors"} items={directorItems} />
				<Items setVal={setStar} name={"stars"} items={starItems} />
				<Items setVal={setRating} name={"rating"} items={ratingItems} />
			</div>
			<div className={styles.searchContainer}>
				<Search />
			</div>
		</div>
	);
};

export default FilterGroup;
