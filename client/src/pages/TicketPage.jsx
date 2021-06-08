import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { BookingContext } from "../contexts/BookingProvider";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/TicketPage.module.css";
import dayjs from "dayjs";
import _ from "lodash";
import { getTicketsPrice } from "../utils/seats";
import advancedFormat from "dayjs/plugin/advancedFormat";
import CounterInput from "react-counter-input";
import Seats from "../components/Seats";

dayjs.extend(advancedFormat);

const TicketPage = (props) => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const { findMovie } = useContext(MovieContext);
	const movie = findMovie(props.match.params.movieId);
	const { getScreeningById, screening } = useContext(ScreeningContext);
	const { getAuditoriumById, auditorium } = useContext(BookingContext);

	const [state, setState] = useState("");

	const history = useHistory();

	useEffect(() => {
		getScreeningById(props.match.params.screeningId);
		getAuditoriumById(props.match.params.auditoriumId);
		console.log(props.match.params.auditoriumId);
	}, []);

	if (!movie || !screening || !auditorium) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	const checkSeats = () => {
		if (movie === null) {
			alert("You need to pick your seats");
		} else {
			history.push(`/booking/${movie._id}/${screening._id}`);
		}
	};

	const selectSeat = (seat) => {
		setSelectedSeats((selectedSeats) => [...selectedSeats, seat]);
	};

	const groupSeats = () => {
		let chunks = [];
		let seats = _.groupBy(auditorium.seats, "row");
		for (const property in seats) {
			chunks.push(seats[property]);
		}
		return chunks;
	};

	const content = () => (
		<div className={styles.ticketPage}>
			<div className={styles.container}>
				<div className={styles.titleContainer}>
					<h5>Salon: {screening.auditorium.id}</h5>
					<h5 className={styles.title}>{movie.title}</h5>
					<h5>{dayjs(screening.time).format("MMMM Do HH:mm")}</h5>
					<h5>Language: {movie.language}</h5>
				</div>
				<h5 className={styles.bioduk}>S C R E E N</h5>
				<div>
					<div className={styles.numberContainer}>
						<h6>Select number of tickets</h6>
						<div className={styles.counter}>
							<CounterInput min={0} max={4} onCountChange={(count) => count} />
						</div>
					</div>
					<div key={auditorium.id}>
						<div className={styles.seatContainer}>
							{groupSeats().map((chunk, i) => (
								<div key={i} className={styles.seatRow}>
									{chunk.map((seat, i) => (
										<Seats onClick={() => selectSeat(seat)} />
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
								<div className={styles.ticket}>
									<span>
										Row:<b>{seat.row}</b> Seat:<b>{seat.id}</b> Price:
										<b>{screening.price}SEK</b>
									</span>
								</div>
							))}
						</div>
						<h6>
							Total price:{getTicketsPrice(selectedSeats, screening.price)}SEK
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
