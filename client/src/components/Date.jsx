import { useContext, useEffect, useState } from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import styles from "../css/FilterGroup.module.css";
const Date = () => {
	const {
		setStartDate,
		setEndDate,
	} = useContext(ScreeningContext);

	useEffect(() => {
		return () => {
			setStartDate("");
			setEndDate("");
		};
	}, []);

	const handleOnChange = (e) => {
		if (e.target.value === "") {
			setStartDate("");
			setEndDate("");
		} else {
			setStartDate(`&startDate=${e.target.value}`);
			setEndDate(`&endDate=${e.target.value}`);
		}
	};

	return (
		<div className={styles.customSelect}>

		</div>
	);
};

export default Date;
