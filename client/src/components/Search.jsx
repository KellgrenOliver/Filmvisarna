import { useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Search = () => {
	const { setSearchString } = useContext(MovieContext);
	useEffect(() => {
		return () => {
			setSearchString("");
		};
	}, []);

	const handleSearch = (e) => {
		setSearchString(`&search=${e.target.value}`);
	};

	return (
		<div>
			<input
				className={styles.searchField}
				type="text"
				placeholder="Search..."
				name="search"
				onChange={handleSearch}
			></input>
		</div>
	);
};

export default Search;
