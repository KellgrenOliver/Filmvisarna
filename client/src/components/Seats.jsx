import React from "react";
import styles from "../css/TicketPage.module.css";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";

const Seats = (props) => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [active, setActive] = useState("");
	const toggleAccordion = () => {
		setActive(active === "" ? "active" : "");
	};

	const selectSeat = (seat) => {
		setSelectedSeats((selectedSeats) => [...selectedSeats, seat]);
		toggleAccordion();
		props.onClick();
	};

	return (
		<div className={styles.seatContainer}>
			<div className={styles.seatRow}>
				<div
					onClick={() => selectSeat()}
					className={`${styles.seatBox} ${
						active ? styles.seatBoxActive : styles.seatBoxInactive
					}`}
				></div>
			</div>
		</div>
	);
};

export default Seats;
