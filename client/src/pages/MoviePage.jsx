import { MovieContext } from "../contexts/MoviesProvider";
import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
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
				<span>{movie.genres.join(", ")}</span>
				<hr />
				<div>
					<span>{movie.description}</span>
				</div>
				<br />
				<div>
					<span>Length: {movie.length}min</span>
				</div>
				<div>
					<span>Year: {movie.year}</span>
				</div>
				<div>
					<span>Language: {movie.language}</span>
				</div>
				<div>
					<span>Directors: {movie.directors.join(", ")}</span>
				</div>
				<div>
					<span>Stars: {movie.stars.join(", ")}</span>
				</div>
				<div>
					<span>Rating: {movie.rating}</span>
				</div>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
