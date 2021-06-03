import { useContext, useEffect, useState} from "react";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import styles from "../css/FilterGroup.module.css";
const ScreeningFilter=()=> {
  const { setPriceMin, setPriceMax, setStartDate, setEndDate, movieScreenings}= useContext(ScreeningContext);
  const [items, setItems] = useState("");

  const getItemsFromAllScreenings = () => { 
    let values = movieScreenings.map((screening) => screening.price);
    setItems([...new Set(values)]);
};


  const handleOnChange = (e) => {
		if (e.target.value === "") {
			setPriceMin("");
			setPriceMax("");
		} else {
      setPriceMin(e.target.value)
      setPriceMax(e.target.value)
		}
	};
  
	return (
		<div className={styles.customSelect}>
			<select className={styles.select}  onChange={handleOnChange}>
				<option className={styles.option} value="">Price:</option>
				{items &&
					items.map((item) => (
						<option className={styles.option} value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
}

export default ScreeningFilter
