import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items";

const Rating = () => {
	const { setRating, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
    return ()=>{
      setRating("")
    }
	}, [movies]);

	const getItemsFromAllMovies = () => {
		let value = movies.map((movie) => movie.rating);
		setItems([...new Set(value)]);
	};

	return (
		<Items setVal={setRating}  name={"rating"} items={items} />
	);
};     

export default Rating;
