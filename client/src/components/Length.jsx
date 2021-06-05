import { useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Length = (props) => {
 
	const handleLength = (e) => {
		if (e.target.value === "0") {
			props.setLengthMin(`?lengthMin=` + 0);
			props.setLengthMax(`&lengthMax=` + Infinity);
		} else if (e.target.value === "1") {
			props.setLengthMin(`?lengthMin=` + 0);
			props.setLengthMax(`&lengthMax=` + 99);
		} else if (e.target.value === "2") {
			props.setLengthMin(`?lengthMin=` + 100);
			props.setLengthMax(`&lengthMax=` + 199);
		} else if (e.target.value === "3") {
			props.setLengthMin(`?lengthMin=` + 200);
      props.setLengthMax("");
		}
	};

	const renderLength = () => {
		return (
			<div className={styles.customSelect}>
				<select className={styles.select} onChange={handleLength}>
					<option className={styles.option} value="0">Length:</option>
					<option className={styles.option} value="1">0-99 min</option>
					<option className={styles.option} value="2">100-199 min</option>
					<option className={styles.option} value="3">200 min</option>
				</select>
			</div>
		);
	};

	return <div>{renderLength()}</div>;
};

export default Length;
