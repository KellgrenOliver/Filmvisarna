import { useContext } from "react"
import { FilterContext } from "../contexts/FilterProvider"
import styles from "../css/FilterGroup.module.css";

const Search = () => {
  const { search } = useContext(MovieContext);

  const handleSearch = (e) =>{
    search(e.target.value)
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
