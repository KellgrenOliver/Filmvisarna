import { MovieContext } from "../contexts/MovieProvider";
import { useContext, useEffect } from "react";
import styles from "../css/HomePage.module.css";

const Home = () => {
	const { movies, fetchAllMovies } = useContext(MovieContext);

	useEffect(() => {
		fetchAllMovies();
		// eslint-disable-next-line
	}, []);

	// 	return (
	// 		<div>
	// 			{movies.map((movie, i) => (
	// 				<div className={styles.cardWrapper} key={i}>
	// 					<img className={styles.card} src={movie.poster} alt={movie.title} />
	// 					<h2>{movie.title}</h2>
	// 				</div>
	// 			))}
	// 		</div>
	// 	);
	// };

	const renderMovies = () => {
		return movies.map((movie) => (
			<div key={movie.movie} className={styles.card}>
				<img className={styles.img} src={movie.poster} alt={movie.title} />
				{/* {movie.title} */}
			</div>
		));
	};

	return (
		<div>
			<div className={styles.cardWrapper}>{movies && renderMovies()}</div>
		</div>
	);
};

export default Home;
