import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Login from "../components/Login";
import CreateUser from "../components/CreateUser";

dayjs.extend(advancedFormat);

const Movie = (props) => {
	const [show, setShow] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const { loggedIn } = useContext(UserContext);

	useEffect(() => {}, [loggedIn]);

	const { findMovie } = useContext(MovieContext);
	const { getScreeningsFromMovie, movieScreenings, filteredMovieScreenings,	getScreeningsFromMovieByFilter, priceMin, priceMax, startDate, endDate} =
		useContext(ScreeningContext);

	const movie = findMovie(props.match.params.movieId);

	useEffect(() => {
		getScreeningsFromMovie(props.match.params.movieId);
	}, []);

	useEffect(() => {
		getScreeningsFromMovieByFilter(props.match.params.movieId);
	}, [priceMin, priceMax, startDate, endDate]);



  console.log(loggedIn)
  
	if (!movie) {
    return null;
	}
  
	const renderScreenings = () => {
    if(filteredMovieScreenings.length!==0 ){
      console.log(filteredMovieScreenings)
      filteredMovieScreenings.map((screening, i) => (
        <div className={styles.tickets} key={i}>
          <h6 className={styles.ticketInfo}>
            {dayjs(screening.time).format("MMMM Do HH:mm")}
          </h6>
          <h6 className={styles.ticketInfo}>
            Language: {screening.movie.language}
          </h6>
          <Link to={`/ticket/${movie._id}/${screening._id}`}>
            <h6 className={styles.ticketBtn}>Tickets</h6>
          </Link>
        </div>
      ));
    }else {
      movieScreenings.map((screening, i) => (
        <div className={styles.tickets} key={i}>
          <h6 className={styles.ticketInfo}>
            {dayjs(screening.time).format("MMMM Do HH:mm")}
          </h6>
          <h6 className={styles.ticketInfo}>
            Language: {screening.movie.language}
          </h6>
          <Link to={`/ticket/${movie._id}/${screening._id}`}>
            <h6 className={styles.ticketBtn}>Tickets</h6>
          </Link>
        </div>
      ));

	const renderScreenings = () =>
		movieScreenings.map((screening, i) => (
			<div className={styles.tickets} key={i}>
				<h6 className={styles.ticketInfo}>
					{dayjs(screening.time).format("MMMM Do HH:mm")}
				</h6>
				<h6 className={styles.ticketInfo}>
					Language: {screening.movie.language}
				</h6>
				{loggedIn ? (
					<>
						<Link to={`/ticket/${movie._id}/${screening._id}`}>
							<h6 className={styles.ticketBtn}>Tickets</h6>
						</Link>
					</>
				) : (
					<div>
						<h6 onClick={() => setShow(true)} className={styles.ticketBtn}>
							Tickets
						</h6>
						<Login
							onClose={() => setShow(false)}
							onHandleClick={() => setShowRegister(true)}
							show={show}
						/>
						<div>
							<CreateUser
								onClose={() => setShowRegister(false)}
								onOpen={() => setShow(true)}
								showRegister={showRegister}
							/>
						</div>
					</div>
				)}
			</div>
		));

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
					<div>{movieScreenings && renderScreenings()}</div>
				</div>
			</div>
			<div className={styles.trailerContainer}>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;
