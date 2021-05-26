import { MovieContext } from "../contexts/MoviesProvider";
import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
	const { loggedIn } = useContext(UserContext);

	useEffect(() => {}, [loggedIn]);

	const { findMovie } = useContext(MovieContext);
	const movie = findMovie(props.match.params.movieId);

	if (!movie) {
		return null;
	}

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
