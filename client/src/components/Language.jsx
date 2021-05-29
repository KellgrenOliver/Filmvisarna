import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items"

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
