import Search from "./Search"
import Filter from "./Filter"
import styles from "../css/FilterGroup.module.css";
const FilterGroup = () => {


	return (
		<div className={styles.groupContainer}>
        <Filter />
      <div className={styles.searchWrapper}>
        <Search />  
      </div>
		</div>
	);
};

export default FilterGroup;
