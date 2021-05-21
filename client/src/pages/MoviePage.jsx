import { MovieContext } from "../contexts/MoviesProvider";
import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";

const Movie = (props) => {
	const { singleMovie, fetchMovieById } = useContext(MovieContext);

	useEffect(() => {
		fetchMovieById(props.match.params.movieId);
	}, [props.match.params.movieId]);

	return (
		<div className={styles.moviePage}>
			<div className={styles.container}>
				<img className={styles.img} src={singleMovie.poster} alt="Movie Logo" />
				<div>
					<h3>{singleMovie.title}</h3>
				</div>
				<span>{singleMovie.genres}</span>
				<div></div>
				<hr />
				<div>
					<span>{singleMovie.description}</span>
				</div>
				<br />
				<div>
					<span>Directors: {singleMovie.directors}</span>
				</div>
				<div>
					<span>Length: {singleMovie.length}min</span>
				</div>
				<div>
					<span>Year: {singleMovie.year}</span>
				</div>
				<div>
					<span>Language: {singleMovie.language}</span>
				</div>
				<YouTube className={styles.trailer} videoId={singleMovie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
