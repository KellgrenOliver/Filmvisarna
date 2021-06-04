import { useContext, useEffect, useState } from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import DatePicker, { getDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "../css/FilterGroup.module.css";
const Dates = () => {
  const {
    startDate,
		setStartDate,
		setEndDate,
	} = useContext(ScreeningContext);
  const [date, setDate] = useState(new Date())
  const [pickerDate, setPickerDate] = useState("")

	useEffect(() => {

		return () => {
			setStartDate("");
			setEndDate("");
		};
	}, []);

    const handleChange = (value) => {
      let filterDate =  value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate()
      let nextDate = new Date (value.setDate( value.getDate() +1 ));
      nextDate =  nextDate.getFullYear() + "-" + (nextDate.getMonth() + 1) + "-" + nextDate.getDate()
      setPickerDate(filterDate)
      setStartDate(`&startDate=${filterDate}`)
      setEndDate(nextDate)
    }
  

	return (
		<div className={styles.customSelect}>
       <DatePicker
      selected={date}
      onChange={handleChange}
      customInput={
        <button className={styles.selectDate}>
         Date: {pickerDate}
        </button>
        }
        />
		</div>
	);
};

export default Dates;
