import { useState } from "react";
import Search from "./Search"
import styles from "../css/FilterGroup.module.css";
const FilterGroup = () => {
	const [showSearch, setShowSearch] = useState(false);

	return (
		<div className={styles.groupContainer}>
      <button className={styles.iconButton} >
      <img src="assets/icons/search.svg" alt="search" />
      </button>
      <div className={styles.searchWrapper}>
      <Search />
      </div>
		</div>
	);
};

export default FilterGroup;
