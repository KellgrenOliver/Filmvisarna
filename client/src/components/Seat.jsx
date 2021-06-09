import styles from "../css/TicketPage.module.css";

const Seats = (props) => {
	const color = () => {
		if (props.isBooked) return styles.seatBoxBooked;
		if (props.active) return styles.seatBoxActive;
		return styles.seatBoxInactive;
	};

	const hoverColor = () => {
		if (!props.isHovered) return;
		return props.hoverContainsBooked()
			? styles.seatBoxUnbookable
			: styles.seatBoxHovered;
	};

	return (
		<div className={styles.seatContainer}>
			<div className={styles.seatRow}>
				<button
					className={`${styles.seatBox} ${color()} ${hoverColor()}`}
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
