import { useContext, useEffect, useState } from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import Items from "./Items"
import styles from "../css/FilterGroup.module.css";
const Price = () => {
	const {
		setPriceMin,
		setPriceMax,
		movieScreenings,
	} = useContext(ScreeningContext);
	const [items, setItems] = useState("");

	useEffect(() => {
		if (movieScreenings) {
			getItemsFromAllScreenings();
		}
		return () => {
			setPriceMin("");
			setPriceMax("");
		};
	}, [movieScreenings]);

	const getItemsFromAllScreenings = () => {
		let values = movieScreenings.map((screening) => screening.price);
		setItems([...new Set(values)]);
	};

	const handleOnChange = (e) => {
		if (e.target.value === "") {
			setPriceMin("?priceMin=0");
			setPriceMax("");
		} else {
			setPriceMin(`?priceMin=${e.target.value}`);
			setPriceMax(`&priceMax=${e.target.value}`);
		}
	};
  
	return (
		<div className={styles.customSelect}>
			<select className={styles.select} onChange={handleOnChange}>
				<option className={styles.option} value="">
					Price:
				</option>
				{items &&
					items.map((item) => (
						<option className={styles.option} value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
};

export default Price;
