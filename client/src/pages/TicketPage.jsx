import { MovieContext } from "../contexts/MoviesProvider";
import { useContext } from "react";
import NumericInput from "react-numeric-input";
import React from "react";
import styles from "../css/TicketPage.module.css";

const TicketPage = (props) => {
	const { findMovie } = useContext(MovieContext);
	const movie = findMovie(props.match.params.movieId);
	console.log(movie);

	if (!movie) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	return (
		<div className={styles.ticketPage}>
			<div className={styles.container}>
				<div className={styles.titleContainer}>
					<h5>Salon</h5>
					<h5 className={styles.title}>{movie.title}</h5>
					<h5>Date, Time</h5>
					<h5>Age limit, Language, Subtitle</h5>
				</div>
				<h5>1. Choose seats</h5>
				<h5 className={styles.bioduk}>S C R E E N</h5>
				<h5>Seats</h5>
				<div className={styles.platserContainer}>
					<div className={styles.tPlatser} />
					<span className={styles.platserTitle}>Available seats</span>
					<div className={styles.oPlatser} />
					<span className={styles.platserTitle}>Unavailable seats</span>
					<div className={styles.dStolval} />
					<span className={styles.platserTitle}>Your seat choice</span>
				</div>
				<h5>Select tickets</h5>
				<div className={styles.numberContainer}>
					<span className={styles.ticketTitle}>Adult </span>
					<NumericInput
						className={styles.numberInput}
						min={0}
						max={46}
						value={0}
					/>
					<span className={styles.ticketTitle}>Pensioner </span>
					<NumericInput
						className={styles.numberInput}
						min={0}
						max={46}
						value={0}
					/>
					<span className={styles.ticketTitle}>Child </span>
					<NumericInput
						className={styles.numberInput}
						min={0}
						max={46}
						value={0}
					/>
				</div>

				<div className={styles.payContainer}>
					<img className={styles.img} src={movie.poster} alt={movie.title} />
					<div className={styles.pay}>
						<h6>{movie.title}</h6>
						<h6>Time</h6>
						<h6>Tickets</h6>
						<h6>Price:</h6>
						<button className={styles.button}>Book</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketPage;
