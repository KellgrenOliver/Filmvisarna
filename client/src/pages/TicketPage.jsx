import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { BookingContext } from "../contexts/BookingProvider";
import { useContext, useEffect, useState } from "react";
import styles from "../css/TicketPage.module.css";
import dayjs from "dayjs";
import _, { indexOf } from "lodash";
import { getTicketsPrice } from "../utils/seats";
import advancedFormat from "dayjs/plugin/advancedFormat";
import CounterInput from "react-counter-input";
import Seat from "../components/Seat";
import TicketCounter from "../components/TicketCounter";

dayjs.extend(advancedFormat);

const MAX_SELECT = 5;

const TicketPage = (props) => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [hoveredSeats, setHoveredSeats] = useState([]);

	const { findMovie } = useContext(MovieContext);
	const { getScreeningById, screening } = useContext(ScreeningContext);
	const { getAuditoriumById, auditorium } = useContext(BookingContext);

	const movie = findMovie(props.match.params.movieId);

	useEffect(() => {
		getScreeningById(props.match.params.screeningId);
		getAuditoriumById(props.match.params.auditoriumId);
	}, []);

	if (!movie || !screening || !auditorium) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	const getSeatsToRight = (seat, row = []) => {
		const seats = [];
		for (let i = row.indexOf(seat); i < row.length; i++) {
			seats.push(row[i]);
			if (seats.length >= MAX_SELECT) break;
		}
		return seats;
	};

	const hoverSeats = (seat, row) => {
		const seats = getSeatsToRight(seat, row);
		const hoveredSeats = [];
		for (let i = 0; i < seats.length; i++) {
			if (isBooked(seats[i])) break;
			hoveredSeats.push(seats[i]);
		}
		setHoveredSeats(hoveredSeats);
	};

	const selectHovered = () => setSelectedSeats(hoveredSeats);

	const checkSeats = async () => {
		if (!selectedSeats.length) {
			return alert("You need to pick your seats");
		}
		const { status } = await fetch("/api/v1/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				seats: selectedSeats,
				screeningId: screening._id,
			}),
		});
		if (status === 200) {
			// setSelectedSeats([]); // TODO: gör en check att om användaren bokat biljetter från denna screening, rediracta bort, och ta bort denna rad när ni är klara
			props.history.push(`/booking/${movie._id}/${screening._id}`);
		} else {
			alert("Something went wrong!");
		}
	};

	const groupSeats = () => {
		let rows = [];
		let seats = _.groupBy(auditorium.seats, "row");
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

	const content = () => (
		<div className={styles.ticketPage}>
			<div className={styles.container}>
				<div className={styles.titleContainer}>
					<h5>Salon: {screening.auditorium.id}</h5>
					<h5 className={styles.title}>{movie.title}</h5>
					<h5>{dayjs(screening.time).format("MMMM Do HH:mm")}</h5>
					<h5>Language: {movie.language}</h5>
				</div>
				<h5 className={styles.bioduk}>SCREEN</h5>
				<div>
					<div className={styles.numberContainer}>
						<div className={styles.counter}>
							<h6>Adult</h6>
							<CounterInput min={0} max={4} onCountChange={(count) => count} />
						</div>
						<div className={styles.counter}>
							<h6>Senior</h6>
							<CounterInput min={0} max={4} onCountChange={(count) => count} />
						</div>
						<div className={styles.counter}>
							<h6>Child</h6>
							<CounterInput min={0} max={4} onCountChange={(count) => count} />
						</div>
					</div>
					<div key={auditorium.id}>
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
					<img className={styles.img} src={movie.poster} alt={movie.title} />
					<div className={styles.pay}>
						<div>
							{selectedSeats.map((seat) => (
								<div className={styles.ticket} key={seat._id}>
									<span>
										Row:<b>{seat.row}</b> Seat:<b>{seat.id}</b> Price:
										<b>{screening.price}SEK</b>
									</span>
								</div>
							))}
						</div>
						<h6>
							Total: {getTicketsPrice(selectedSeats, screening.price)} SEK
						</h6>
						<button onClick={checkSeats} className={styles.button}>
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
