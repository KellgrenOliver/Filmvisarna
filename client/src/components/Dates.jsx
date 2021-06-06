import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../css/FilterScreeningGroup.module.css";
const Dates = (props) => {

	const [date, setDate] = useState(new Date());
	const [pickerDate, setPickerDate] = useState("");

	const handleChange = (value) => {
		let filterDate =
			value.getFullYear() +
			"-" +
			(value.getMonth() + 1) +
			"-" +
			value.getDate();
		let nextDate = new Date(value.setDate(value.getDate() + 1));
		nextDate =
			nextDate.getFullYear() +
			"-" +
			(nextDate.getMonth() + 1) +
			"-" +
			nextDate.getDate();
		setPickerDate(filterDate);
		props.setStartDate(`&startDate=${filterDate}`);
		props.setEndDate(`&endDate=${nextDate}`);
	};

	return (
		<div className={styles.customSelect}>
			<DatePicker
				selected={date}
				onChange={handleChange}
				customInput={
					<button className={styles.selectDate}>Date: {pickerDate}</button>
				}
			/>
		</div>
	);
};

export default Dates;
