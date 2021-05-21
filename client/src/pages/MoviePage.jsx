import { MovieContext } from "../contexts/MoviesProvider";
import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "../css/Movie.module.css";

const Movie = (props) => {
	const { singleMovie, fetchMovieById } = useContext(MovieContext);

	useEffect(() => {
		fetchMovieById(props.match.params.movieId);
		console.log(props.match);
	}, [props.match.params.movieId]);

	return (
		<div className={styles.moviePage}>
			<h1>HEJ</h1>
			<img src={singleMovie.poster} alt="Movie Logo" />
			<YouTube videoId={singleMovie.trailer} />
		</div>
	);
};

export default Movie;
