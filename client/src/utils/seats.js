export function getTicketsPrice(seats = [], price = 100) {
	if (!seats) return 0;

	return seats.reduce((total, seat) => {
		if (!seat) return total;

		function calculatePrice(multiplier) {
			const ticketPrice = price * multiplier;
			seat.price = ticketPrice;
			return total + ticketPrice;
		}

		switch (seat.type?.toLowerCase()) {
			case "adult":
				return calculatePrice(1);
			case "senior":
				return calculatePrice(0.8);
			case "child":
				return calculatePrice(0.7);
			default:
				return calculatePrice(1);
		}
	}, 0);
}
