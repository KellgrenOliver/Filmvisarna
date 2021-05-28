import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Language = () => {
	const { setLanguage, searchedMovies, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let value = movies.map((movie) => movie.language);
		setItems([...new Set(value)]);
	};

	const renderLanguage = () => {
		return (
			<select
				name="language"
				onChange={(e) => setLanguage(`&language=${e.target.value}`)}
			>
				<option selected disabled>
					Language:
				</option>
				{items &&
					items.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		);
	};

	return <div>{renderLanguage()}</div>;
};

export default Language;
