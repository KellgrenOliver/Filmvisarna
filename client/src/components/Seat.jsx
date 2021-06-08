import styles from "../css/TicketPage.module.css";

const Seats = (props) => {
	const color = () => {
		if (props.isBooked) return styles.seatBoxBooked;
		if (props.active) return styles.seatBoxActive;
		return styles.seatBoxInactive;
	};

	return (
		<div className={styles.seatContainer}>
			<div className={styles.seatRow}>
				<button
					disabled={props.isBooked}
					className={`${styles.seatBox} ${color()} ${
						props.isHovered ? styles.seatBoxHovered : ""
					}`}
					onClick={props.selectHovered}
					onMouseEnter={() => props.hoverSeats(props.seat, props.row)}
					onMouseLeave={() => props.setHoveredSeats([])}
				>
					{props.seat.id}
				</button>
			</div>
		</div>
	);
};

export default Seats;
