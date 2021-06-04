import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import Items from "./Items";

const Star = () => {
	const { setStar, movies } = useContext(MovieContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movies) {
			getItemsFromAllMovies();
		}
    return () => {
      setStar("");
    };
	}, [movies]);

	const getItemsFromAllMovies =() => {
      let values = movies.map((movie) => movie.stars);
      let result = [];
      values.forEach((value) => {
        result = result.concat(value);
      });
      setItems([...new Set(result)]);  
	};

	return <Items setVal={ setStar } name={"stars"} items={items} setItems={setItems}/>;
};

export default Star;
