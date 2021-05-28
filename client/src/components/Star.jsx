import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Star = () => {
	const { setStar, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let values = movies.map((movie) => movie.stars);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setItems([...new Set(result)]);
	};

	const renderStar = () => {
		return (
			<select name="star" onChange={(e) => setStar(`&star=${e.target.value}`)}>
				<option value="">Star:</option>
				{items &&
					items.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		);
	};

	return <div>{renderStar()}</div>;
};

export default Star;
