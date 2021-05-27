import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserProvider";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
	const { loggedIn } = useContext(UserContext);

	useEffect(() => {}, [loggedIn]);

	const { findMovie } = useContext(MovieContext);
	const { getScreeningsFromMovie, movieScreenings } =
		useContext(ScreeningContext);
	const convertToDateObject = (timeString) => {
		return new Date(parseInt(timeString.replace(/[\/\(\)date]/gi, "")))
			.toLocaleString()
			.split(" ")[1];
	};
	const movie = findMovie(props.match.params.movieId);

	useEffect(() => {
		getScreeningsFromMovie(props.match.params.movieId);
	}, []);

	if (!movie) {
		return null;
	}

	const renderScreenings = () =>
		movieScreenings.map((screening, i) => (
			<div className={styles.tickets} key={i}>
				<h6 className={styles.ticketInfo}>
					{convertToDateObject(screening.time)}
				</h6>
				<h6 className={styles.ticketInfo}>Tal: {screening.movie.language}</h6>
				<h6 className={styles.ticketBtn}>Biljetter</h6>
			</div>
		));

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
				<div>{movieScreenings && renderScreenings()}</div>
				<div>
					{loggedIn && (
						<>
							<span>DATUM, TID, SPRÅK</span>
							<Link to={`/ticket/${movie._id}`}>
								<button>Buy Tickets</button>
							</Link>
						</>
					)}
				</div>
			</div>
			<div className={styles.trailerContainer}>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
