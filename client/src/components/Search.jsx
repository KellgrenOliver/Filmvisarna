import { useContext } from "react"
import { MovieContext } from "../contexts/MoviesProvider"
import styles from "../css/FilterGroup.module.css";

const Search = () => {
  const { search } = useContext(MovieContext);

  const handleSearch = (e) =>{
    let searchString = `?search=${e.target.value}`
    search(searchString)
  }
  
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
