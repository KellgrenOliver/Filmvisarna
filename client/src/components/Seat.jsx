import React from "react";
import styles from "../css/TicketPage.module.css";

const Seats = (props) => {
	const color = () => {
		if (props.isBooked) {
			return styles.seatBoxBooked;
		} else if (props.active) {
			return styles.seatBoxActive;
		} else {
			return styles.seatBoxInactive;
		}
	};
	console.log(props.isBooked);
	return (
		<div className={styles.seatContainer}>
			<div className={styles.seatRow}>
				<button
					disabled={props.isBooked}
					onClick={() => props.toggle(props.seat)}
					className={`${styles.seatBox} ${color()}`}
				></button>
			</div>
		</div>
	);
};

export default Seats;
