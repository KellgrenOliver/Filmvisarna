import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { BookingContext } from "../contexts/BookingProvider";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/TicketPage.module.css";
import dayjs from "dayjs";
import _ from "lodash";
import { getTicketsPrice } from "../../../api/utils/seats";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const TicketPage = (props) => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const { findMovie } = useContext(MovieContext);
	const movie = findMovie(props.match.params.movieId);
	const { getScreeningById, screening } = useContext(ScreeningContext);
	const { getAuditoriumById, auditorium } = useContext(BookingContext);

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
					<h5>
						Rating: {movie.rating}, Language: {movie.language}
					</h5>
				</div>
				<h5 className={styles.bioduk}>S C R E E N</h5>
				<div>
					<h5>Select tickets</h5>
					<div className={styles.numberContainer}>
						<input
							className={styles.numberInput}
							type="number"
							min={0}
							max={46}
						/>
					</div>
					<div key={auditorium.id}>
						<div className={styles.seatContainer}>
							{groupSeats().map((chunk, i) => (
								<div key={i} className={styles.seatRow}>
									{chunk.map((seat, i) => (
										<div
											key={i}
											onClick={() => selectSeat(seat)}
											className={styles.seatBox}
										></div>
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
						<h6>{movie.title}</h6>
						<h6>{dayjs(screening.time).format("MMMM Do HH:mm")}</h6>
						<h6>Tickets</h6>
						<div>
							{selectedSeats.map((seat) => (
								<span>
									{seat.id}
									{seat.row}
								</span>
							))}
						</div>
						<h6>Price:{getTicketsPrice(selectedSeats, screening.price)}</h6>
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
