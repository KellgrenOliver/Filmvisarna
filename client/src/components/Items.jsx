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
		<div>
			<select name={props.name} onChange={handleOnChange}>
				<option value="">{props.name}:</option>
				{props.items &&
					props.items.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
};

export default Items;
