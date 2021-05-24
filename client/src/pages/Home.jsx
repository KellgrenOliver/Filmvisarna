import { MovieContext } from "../contexts/MoviesProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import FilterGroup from "../components/FilterGroup"
import styles from "../css/HomePage.module.css";

const Home = () => {
	const { movies } = useContext(MovieContext);

	const renderMovies = () => {
		return movies.map((movie, i) => (
			<Link to={`/movie/${movie._id}`} key={i} className={styles.card}>
				<img src={movie.poster} className={styles.img} alt={movie.title} />
			</Link>
		));
	};

	return (
		<div className={styles.container}>
      <FilterGroup /> 
			<div className={styles.cardWrapper}>{movies && renderMovies()}</div>
		</div>
	);
};

export default Home;
