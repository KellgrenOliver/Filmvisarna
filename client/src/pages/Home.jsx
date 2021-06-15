import { MovieContext } from "../contexts/MoviesProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterGroup from "../components/FilterGroup";
import styles from "../css/HomePage.module.css";
import Login from "../components/Login";
import CreateUser from "../components/CreateUser";
import { UserContext } from "../contexts/UserProvider";

const Home = ({ location, history }) => {
	const { movies, searchedMovies, message } = useContext(MovieContext);
	useEffect(() => {
		renderMovies();
	}, [searchedMovies, message]);

	const { loggedIn } = useContext(UserContext);

	const [loginOpen, setLoginOpen] = useState(() => {
		if (location.state?.openModal) {
			return true;
		}
		return false;
	});
	const [registerOpen, setRegisterOpen] = useState(false);

	useEffect(() => {
		history.push("/", { openModal: false });
	}, [location.state?.openModal]);

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

	const renderMessage = () => {
		return <h3>{message}</h3>;
	};

	return (
		<div className={styles.container}>
			<FilterGroup />
			<Login
				onClose={() => setLoginOpen(false)}
				onHandleClick={() => setRegisterOpen(true)}
				show={!loggedIn && loginOpen}
			/>
			<CreateUser
				onClose={() => setRegisterOpen(false)}
				onOpen={() => setLoginOpen(true)}
				showRegister={!loggedIn && registerOpen}
			/>
			<div className={styles.message}>{message && renderMessage()}</div>
			<div className={styles.cardWrapper}>{movies && renderMovies()}</div>
		</div>
	);
};

export default Home;
