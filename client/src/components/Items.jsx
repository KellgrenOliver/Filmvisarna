import styles from "../css/FilterGroup.module.css";

const Items = (props) => {
  
  const handleOnChange = (e) => {
		if (e.target.value === "") {
			props.setVal("");
		} else {
			props.setVal(`&${props.name}=${e.target.value}`);
		}
	};
  
	return (
		<div className={styles.customSelect}>
			<select className={styles.select} name={props.name} onChange={handleOnChange}>
				<option className={styles.option} value="">{props.name.toUpperCase()}:</option>
				{props.items &&
					props.items.map((item) => (
						<option className={styles.option} value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
};

export default Items;
