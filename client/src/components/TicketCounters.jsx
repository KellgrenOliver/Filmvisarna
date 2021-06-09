import { useEffect, useState } from "react";
import styles from "../css/TicketPage.module.css";
import TicketCounter from "./TicketCounter";

export default function TicketCounters({ value, max, setTickets }) {
	const [ticketCounters, setTicketCounters] = useState(value);

	const ticketCountersTotal = () =>
		ticketCounters.adult + ticketCounters.senior + ticketCounters.child;

	const decrement = (ticket, value) => {
		if (!ticket || ticketCountersTotal() <= 0 || value <= 0) return;

		setTicketCounters((ticketCounters) => ({
			...ticketCounters,
			[ticket]: value - 1,
		}));
	};

	useEffect(() => {
		setTickets(ticketCounters);
	}, [
		ticketCounters.adult,
		ticketCounters.child,
		ticketCounters.senior,
		setTickets,
	]);

	const increment = (ticket, value) => {
		if (!ticket || ticketCountersTotal() >= max) return;

		setTicketCounters((ticketCounters) => ({
			...ticketCounters,
			[ticket]: value + 1,
		}));
	};

	return (
		<div className={styles.numberContainer}>
			<div className={styles.counter}>
				<h6>Adult</h6>
				<TicketCounter
					value={ticketCounters.adult}
					increment={increment}
					decrement={decrement}
					type="adult"
				/>
			</div>
			<div className={styles.counter}>
				<h6>Senior</h6>
				<TicketCounter
					value={ticketCounters.senior}
					increment={increment}
					decrement={decrement}
					type="senior"
				/>
			</div>
			<div className={styles.counter}>
				<h6>Child</h6>
				<TicketCounter
					value={ticketCounters.child}
					increment={increment}
					decrement={decrement}
					type="child"
				/>
			</div>
		</div>
	);
}
