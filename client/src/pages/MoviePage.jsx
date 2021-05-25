import { MovieContext } from "../contexts/MoviesProvider";
import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
	const { loggedIn } = useContext(UserContext);

	useEffect(() => {}, [loggedIn]);

	const history = useHistory();

	const { findMovie } = useContext(MovieContext);
	const movie = findMovie(props.match.params.movieId);

	if (!movie) {
		return null;
	}

	const renderTicket = () => {
		if (loggedIn) {
			history.push(`/ticket/${movie._id}`);
		} else {
			alert("You must be logged in to buy tickets!");
		}
	};

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
				<div>
					<span>DATUM, TID, SPRÅK</span>
					<button onClick={renderTicket}>Buy Tickets</button>
				</div>
			</div>
			<div className={styles.trailerContainer}>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
