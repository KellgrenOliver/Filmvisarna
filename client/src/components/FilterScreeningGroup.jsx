import { useContext, useEffect, useState } from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import Price from "./Price";
import Dates from "./Dates";
import styles from "../css/FilterScreeningGroup.module.css";
const FilterScreeningGroup = () => {
	const {
		setStartDate,
		setEndDate,
		setPriceMin,
		setPriceMax,
		movieScreenings,
	} = useContext(ScreeningContext);

	const [priceItems, setPriceItems] = useState("");

	useEffect(() => {
		if (movieScreenings) {
			getPriceItemsFromAllScreenings();
		}
		return () => {
			setPriceMin("?priceMin=0");
			setStartDate("");
			setEndDate("");
		};
	}, [movieScreenings]);

	const getPriceItemsFromAllScreenings = () => {
		let values = movieScreenings.map((screening) => screening.price);
		setPriceItems([...new Set(values)]);
	};

	return (
		<div className={styles.groupContainer}>
				<Price
					items={priceItems}
					setPriceMin={setPriceMin}
					setPriceMax={setPriceMax}
				/>
				<Dates setStartDate={setStartDate} setEndDate={setEndDate} />
		</div>
	);
};

export default FilterScreeningGroup;
