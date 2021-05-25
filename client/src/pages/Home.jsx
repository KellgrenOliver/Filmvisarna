import { MovieContext } from "../contexts/MoviesProvider";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterGroup from "../components/FilterGroup";
import styles from "../css/HomePage.module.css";

const Home = () => {
	const { movies, searchedMovies, message } = useContext(MovieContext);
	useEffect(() => {
		console.log(searchedMovies);
		renderMovies();
	}, [searchedMovies, message]);

	const renderMovies = () => {
		if (searchedMovies) {
			return searchedMovies.map((movie, i) => (
				<Link to={`/movie/${movie._id}`} key={i} className={styles.card}>
					<img src={movie.poster} className={styles.img} alt={movie.title} />
				</Link>
			));
		} else {
			return movies.map((movie, i) => (
				<Link to={`/movie/${movie._id}`} key={i} className={styles.card}>
					<img src={movie.poster} className={styles.img} alt={movie.title} />
				</Link>
			));
		}
	};
  
  const renderMessage=()=>{
    return <h3>{message}</h3>
  }

	return (
		<div className={styles.container}>
			<FilterGroup />
      <div className={styles.message}>{message && renderMessage()}</div>
			<div className={styles.cardWrapper}>{movies && renderMovies()}</div>
		</div>
	);
};

export default Home;
