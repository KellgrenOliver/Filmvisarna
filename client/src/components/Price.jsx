
import styles from "../css/FilterScreeningGroup.module.css";
const Price = (props) => {

	const handleOnChange = (e) => {
		if (e.target.value === "") {
			props.setPriceMin("?priceMin=0");
			props.setPriceMax("");
		} else {
			props.setPriceMin(`?priceMin=${e.target.value}`);
			props.setPriceMax(`&priceMax=${e.target.value}`);
		}
	};
  
	return (
		<div id={styles.customSelect}>
			<select id={styles.select} onChange={handleOnChange}>
				<option id={styles.option} value="">
					Price:
				</option>
				{props.items &&
					props.items.map((item) => (
						<option className={styles.option} value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
};

export default Price;
