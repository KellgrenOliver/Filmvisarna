import { MovieContext } from "../contexts/MoviesProvider";
import { useContext } from "react";
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
				<h4>Salong</h4>
				<h4 className={styles.title}>{movie.title}</h4>
				<span>Datum, tid</span>
				<br />
				<span>Åldersgräns, språk, text</span>
				<h4>1. Välj stolar</h4>
				<h4 className={styles.bioduk}>B I O D U K</h4>
				<h4>Platser</h4>
				<div className={styles.platserContainer}>
					<div className={styles.tPlatser} />
					<span className={styles.platserTitle}>Tillgängliga platser</span>
					<div className={styles.oPlatser} />
					<span className={styles.platserTitle}>Otillgängliga platser</span>
					<div className={styles.dStolval} />
					<span className={styles.platserTitle}>Ditt stolval</span>
				</div>
				<h4>Välj antal biljetter</h4>
				<span>Vuxen</span>
				<br />
				<span>Pensionär</span>
				<br />
				<span>Barn</span>
			</div>
		</div>
	);
};

export default TicketPage;
