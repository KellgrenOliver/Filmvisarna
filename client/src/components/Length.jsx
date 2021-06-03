import { useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Length = () => {
	const { setLengthMin, setLengthMax } =
		useContext(MovieContext);

	useEffect(() => {
		return () => {
			setLengthMin(`?lengthMin=` + 0);
			setLengthMax(`&lengthMax=` + Infinity);
		};
	}, []);
  
	const handleLength = (e) => {
		console.log(e.target.value);
		if (e.target.value === "0") {
			setLengthMin(`?lengthMin=` + 0);
			setLengthMax(`&lengthMax=` + Infinity);
		} else if (e.target.value === "1") {
			setLengthMin(`?lengthMin=` + 0);
			setLengthMax(`&lengthMax=` + 99);
		} else if (e.target.value === "2") {
			setLengthMin(`?lengthMin=` + 100);
			setLengthMax(`&lengthMax=` + 199);
		} else if (e.target.value === "3") {
			setLengthMin(`?lengthMin=` + 200);
		}
	};

	const renderLength = () => {
		return (
			<div className={styles.customSelect}>
				<select className={styles.select} onChange={handleLength}>
					<option className={styles.option} value="0">length:</option>
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
