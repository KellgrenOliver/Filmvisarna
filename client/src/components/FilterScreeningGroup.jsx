import { useContext, useEffect, useState } from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import Price from "./Price";
import Dates from "./Dates";
import styles from "../css/FilterScreeningGroup.module.css";
const FilterScreeningGroup = () => {
	const {
		setStartDate,
    endDate,
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
			handleReset();
		};
	}, [movieScreenings]);

	const getPriceItemsFromAllScreenings = () => {
		let values = movieScreenings.map((screening) => screening.price);
		setPriceItems([...new Set(values)]);
	};

	const handleReset = () => {
		setPriceMin("?priceMin=0");
		setStartDate("");
		setEndDate("");
	};

	return (
		<div className={styles.groupContainer}>
			<Price
				items={priceItems}
				setPriceMin={setPriceMin}
				setPriceMax={setPriceMax}
			/>
			<Dates endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
			<button type="reset" onClick={handleReset}>
				reset
			</button>
		</div>
	);
};

export default FilterScreeningGroup;
