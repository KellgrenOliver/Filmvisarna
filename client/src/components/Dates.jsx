import { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import "react-datepicker/dist/react-datepicker.css";
import styles from "../css/FilterScreeningGroup.module.css";
const Dates = (props) => {

	const [date] = useState(new Date());
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
		<div id={styles.customSelect}>
			<DatePicker
				selected={date}
				onChange={handleChange}
        minDate={new Date()}
				customInput={
					<button className={styles.selectDate}><FontAwesomeIcon icon={faCalendarAlt} id={styles.calendar} /> {props.endDate !=="" && pickerDate}</button>
				}
			/>
		</div>
	);
};

export default Dates;
