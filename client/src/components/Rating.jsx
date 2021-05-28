import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Rating = () => {
	const { setRating, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let value = movies.map((movie) => movie.rating);
		setItems([...new Set(value)]);
	};

	const renderRating = () => {
		return (
			<select
				name="rating"
				onChange={(e) => setRating(`&rating=${e.target.value}`)}
			>
				<option value="">Rating:</option>
				{items &&
					items.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		);
	};

	return <div>{renderRating()}</div>;
};

export default Rating;
