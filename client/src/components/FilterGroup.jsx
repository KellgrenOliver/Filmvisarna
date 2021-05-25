import Search from "./Search"
import styles from "../css/FilterGroup.module.css";
const FilterGroup = () => {


	return (
		<div className={styles.groupContainer}>
      {/* Filter is here */}
      <div className={styles.searchWrapper}>
        <Search />  
      </div>
		</div>
	);
};

export default FilterGroup;
