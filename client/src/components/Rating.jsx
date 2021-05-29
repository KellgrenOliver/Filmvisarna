import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items";
import styles from "../css/FilterGroup.module.css";

const Rating = () => {
	const { rating, setRating, movies } = useContext(MovieContext);
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
	const handleOnChange = (e) => {
		if (e.target.value === "") {
			setRating("");
		} else {
			setRating(`&rating=${e.target.value}`);
		}
	};

	return (
		<Items setVal={setRating} handleOnChange={handleOnChange} name={"rating"} items={items} />
	);
};     

export default Rating;
