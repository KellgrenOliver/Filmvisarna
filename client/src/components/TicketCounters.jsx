import { useEffect, useState } from "react";
import styles from "../css/TicketPage.module.css";
import TicketCounter from "./TicketCounter";

export default function TicketCounters({ tickets, max, setTickets }) {
	const ticketCountersTotal = () =>
		tickets.adult + tickets.senior + tickets.child;

	const decrement = (ticket, value) => {
		if (!ticket || ticketCountersTotal() <= 1 || value <= 0) return;
		setTickets((tickets) => ({ ...tickets, [ticket]: value - 1 }));
	};

	const increment = (ticket, value) => {
		if (!ticket || ticketCountersTotal() >= max) return;
		setTickets((tickets) => ({ ...tickets, [ticket]: value + 1 }));
	};

	return (
		<div className={styles.numberContainer}>
			<div className={styles.counter}>
				<h6>Adult</h6>
				<TicketCounter
					value={tickets.adult}
					increment={increment}
					decrement={decrement}
					type="adult"
				/>
			</div>
			<div className={styles.counter}>
				<h6>Senior</h6>
				<TicketCounter
					value={tickets.senior}
					increment={increment}
					decrement={decrement}
					type="senior"
				/>
			</div>
			<div className={styles.counter}>
				<h6>Child</h6>
				<TicketCounter
					value={tickets.child}
					increment={increment}
					decrement={decrement}
					type="child"
				/>
			</div>
		</div>
	);
}
