import Search from "./Search";
import Length from "./Length";
import Language from "./Language";
import Director from "./Director";
import styles from "../css/FilterGroup.module.css";
const FilterGroup = () => {
	return (
		<div className={styles.groupContainer}>
			<Length />
			<Language />
			<Director />
			<div className={styles.searchWrapper}>
				<Search />
			</div>
		</div>
	);
};

export default FilterGroup;
