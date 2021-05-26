import { MovieContext } from "../contexts/MoviesProvider";
import { useContext } from "react";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
	const { findMovie } = useContext(MovieContext);
	console.log(props);
	const movie = findMovie(props.match.params.movieId);

	if (!movie) {
		return null;
	}

	// const renderScreenings = () => {
	// 	return screenings.map((screening, i) =>};
	const content = (
		<div className={styles.tickets}>
			<h5 className={styles.ticketInfo}>Time</h5>
			<h5 className={styles.ticketInfo}>language</h5>
			<h5 className={styles.ticketBtn}>Biljetter</h5>
		</div>
	);

	return (
		<div className={styles.moviePage}>
			<div className={styles.container}>
				<img className={styles.img} src={movie.poster} alt="Movie Logo" />
				<div>
					<h3>{movie.title}</h3>
				</div>
				<span>
					<b>{movie.genres.join(", ")}</b>
				</span>
				<hr />
				<div>
					<span>{movie.description}</span>
				</div>
				<br />
				<div>
					<span>
						<b>Length: </b>
						{movie.length}min
					</span>
				</div>
				<div>
					<span>
						<b>Year: </b>
						{movie.year}
					</span>
				</div>
				<div>
					<span>
						<b>Language: </b>
						{movie.language}
					</span>
				</div>
				<div>
					<span>
						<b>Directors: </b>
						{movie.directors.join(", ")}
					</span>
				</div>
				<div>
					<span>
						<b>Stars: </b>
						{movie.stars.join(", ")}
					</span>
				</div>
				<div>
					<span>
						<b>Rating:</b> {movie.rating}
					</span>
				</div>
				<div>{content}</div>
			</div>
			<div className={styles.trailerContainer}>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
