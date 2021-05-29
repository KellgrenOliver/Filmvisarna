import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items";

const Director = () => {
	const { setDirector, movies } = useContext(MovieContext);
	const [ items, setItems ] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
		return () => {
			setDirector("");
		};
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let values = movies.map((movie) => movie.directors);
		let result = [];
		values.forEach((value) => {
			result = result.concat(value);
		});
		setItems([...new Set(result)]);
	};

	return <Items setVal={setDirector} name={"directors"} items={items} />;
};

export default Director;
