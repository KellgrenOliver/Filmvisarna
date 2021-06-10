export default function TicketCounter({ value, increment, decrement, type }) {
	return (
		<div>
			<button onClick={() => decrement(type, value)}>-</button>
			<span>{value}</span>
			<button onClick={() => increment(type, value)}>+</button>
		</div>
	);
}
