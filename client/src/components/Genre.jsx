import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Genre = () => {
	const { setGenre, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let values = movies.map((movie) => movie.genres);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setItems([...new Set(result)]);
	};

	const renderGenre = () => {
		return (
			<select
				name="genre"
        onChange={(e)=>setGenre(`&genre=${e.target.value}`)   }			
			>
				<option value="" >
					Genre:
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

	return <div>{renderGenre()}</div>;
};

export default Genre;
