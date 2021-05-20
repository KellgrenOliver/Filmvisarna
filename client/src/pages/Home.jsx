import { MovieContext } from "../contexts/MovieProvider";
import { useContext, useEffect } from "react";
import styles from "../css/HomePage.module.css";

const Home = () => {
	const { movies, fetchAllMovies } = useContext(MovieContext);

	useEffect(() => {
		fetchAllMovies();
		// eslint-disable-next-line
	}, []);

	const renderMovies = () => {
		return movies.map((movie, i) => (
			<div key={(movie, i)} className={styles.card}>
				<img className={styles.img} src={movie.poster} alt={movie.title} />
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
