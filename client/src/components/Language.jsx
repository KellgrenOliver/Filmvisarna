import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items"
import styles from "../css/FilterGroup.module.css";

const Language = () => {
	const { setLanguage, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
    return () => {
      setLanguage("");
    };
	}, [movies]);

	const getItemsFromAllMovies = () => { 
      let values = movies.map((movie) => movie.language);
      setItems([...new Set(values)]);
	};

	return <Items setVal ={setLanguage} name={"language"} items={items}/>
};

export default Language;
