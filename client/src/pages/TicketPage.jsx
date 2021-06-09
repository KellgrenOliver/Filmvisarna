import { ScreeningContext } from "../contexts/ScreeningProvider";
import { useContext, useEffect, useState } from "react";
import styles from "../css/TicketPage.module.css";
import dayjs from "dayjs";
import _ from "lodash";
import { getTicketsPrice } from "../utils/seats";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Seat from "../components/Seat";
import TicketCounters from "../components/TicketCounters";
import { UserContext } from "../contexts/UserProvider";

dayjs.extend(advancedFormat);

const MAX_SELECT = 5;

const TicketPage = (props) => {
	const [screening, setScreening] = useState();

	const [selectedSeats, setSelectedSeats] = useState([]);
	const [hoveredSeats, setHoveredSeats] = useState([]);
	const [tickets, setTickets] = useState({
		adult: 2,
		senior: 0,
		child: 0,
	});

	const { getScreeningById } = useContext(ScreeningContext);
	const { addBooking } = useContext(UserContext);

	const ticketsAmount = tickets.adult + tickets.child + tickets.senior;

	useEffect(() => {
		(async () => {
			const screening = await getScreeningById(props.match.params.screeningId);
			if (screening) {
				setScreening(screening);
			}
		})();
	}, [props.match.params.screeningId]);

	if (!screening) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	const getSeatsToRight = (seat, row = []) => {
		const seats = [];
		for (let i = row.indexOf(seat); i < row.length; i++) {
			seats.push(row[i]);
			if (seats.length >= ticketsAmount) break;
		}
		return seats;
	};

	const hoverSeats = (seat, row) => setHoveredSeats(getSeatsToRight(seat, row));

	const selectHovered = () => {
		if (hoverContainsBooked || hoveredSeats.length < ticketsAmount) return;

		let { adult, child, senior } = tickets;
		const seats = hoveredSeats;

		const addTypeToSeat = (seat) => {
			if (adult) {
				adult--;
				seat.type = "adult";
			} else if (child) {
				child--;
				seat.type = "child";
			} else if (senior) {
				senior--;
				seat.type = "senior";
			}
		};

		let i = 0;
		while (adult || child || senior) {
			const seat = seats[i];
			if (!seat) break;
			addTypeToSeat(seat);
			i++;
		}

		setSelectedSeats(seats);
	};

	const placeBooking = async () => {
		if (!selectedSeats.length) return alert("You need to pick your seats");

		const response = await fetch("/api/v1/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				seats: selectedSeats,
				screeningId: screening._id,
			}),
		});
		if (response.status === 200) {
			const booking = await response.json();
			addBooking(booking);
			props.history.push(`/booking/${booking._id}`);
			// TODO: gör en check att om användaren bokat biljetter från denna screening, rediracta bort, och ta bort denna rad när ni är klara
		} else {
			alert("Something went wrong!");
		}
	};

	const groupSeats = () => {
		const rows = [];
		const seats = _.groupBy(screening.auditorium.seats, "row");
		for (const property in seats) {
			rows.push(seats[property]);
		}
		return rows;
	};

	const isBooked = (seat) =>
		screening.bookedSeats.some((bookedSeat) => bookedSeat._id === seat._id);

	const isSelected = (seatToFind) =>
		selectedSeats.some((seat) => seat._id === seatToFind._id);

	const isHovered = (seatToFind) =>
		hoveredSeats.some((seat) => seat._id === seatToFind._id);

	const hoverContainsBooked = hoveredSeats.some((seat) => isBooked(seat));

	const content = () => (
		<div className={styles.ticketPage}>
			<div className={styles.container}>
				<div className={styles.titleContainer}>
					<h5>Salon: {screening.auditorium.id}</h5>
					<h5 className={styles.title}>{screening.movie.title}</h5>
					<h5>{dayjs(screening.time).format("MMMM Do HH:mm")}</h5>
					<h5>Language: {screening.movie.language}</h5>
				</div>
				<h5 className={styles.bioduk}>SCREEN</h5>
				<div>
					<TicketCounters
						tickets={tickets}
						setTickets={setTickets}
						max={MAX_SELECT}
					/>
					<div key={screening.auditorium.id}>
						<div className={styles.seatContainer}>
							{groupSeats().map((row, i) => (
								<div key={i} className={styles.seatRow}>
									{row.map((seat) => (
										<Seat
											seat={seat}
											row={row}
											active={isSelected(seat)}
											isHovered={isHovered(seat)}
											isBooked={isBooked(seat)}
											hoverSeats={hoverSeats}
											selectHovered={selectHovered}
											setHoveredSeats={setHoveredSeats}
											hoverContainsBooked={hoverContainsBooked}
											key={seat._id}
										/>
									))}
								</div>
							))}
						</div>
					</div>
					<div className={styles.platserContainer}>
						<div className={styles.tPlatser} />
						<span className={styles.platserTitle}>Available seats</span>
						<div className={styles.oPlatser} />
						<span className={styles.platserTitle}>Unavailable seats</span>
						<div className={styles.dStolval} />
						<span className={styles.platserTitle}>Your seat choice</span>
					</div>
				</div>

				<div className={styles.payContainer}>
					<img
						className={styles.img}
						src={screening.movie.poster}
						alt={screening.movie.title}
					/>
					<div className={styles.pay}>
						<div>
							{selectedSeats.map((seat) => (
								<div className={styles.ticket} key={seat._id}>
									<span>
										Row: <b>{seat.row} </b>
										Seat: <b>{seat.id} </b>
										Price: <b>{seat.price} SEK </b>
										Age: <b>{seat.type} </b>
									</span>
								</div>
							))}
						</div>
						<h6>
							Total: {getTicketsPrice(selectedSeats, screening.price)} SEK
						</h6>
						<button onClick={placeBooking} className={styles.button}>
							Book
						</button>
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<div>
			<div>{content()}</div>
		</div>
	);
};

export default TicketPage;
