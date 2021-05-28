import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Director = () => {
	const { setDirector, searchedMovies, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let values = movies.map((movie) => movie.directors);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setItems([...new Set(result)]);
	};

	const renderDirector = () => {
		return (
			<select
				name="director"
				onChange={(e) => setDirector(`&director=${e.target.value}`)}
			>
				<option value="">
					Director:
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

	return <div>{renderDirector()}</div>;
};

export default Director;
