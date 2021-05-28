import Search from "./Search";
import Length from "./Length";
import Language from "./Language";
import Genre from "./Genre";
import Director from "./Director";
import Star from "./Star";
import Rating from "./Rating";
import styles from "../css/FilterGroup.module.css";
const FilterGroup = () => {
	return (
		<div className={styles.groupContainer}>
			<Length />
			<Language />
      <Genre />
			<Director />
      <Star />
      <Rating />
			<div className={styles.searchWrapper}>
				<Search />
			</div>
		</div>
	);
};

export default FilterGroup;
