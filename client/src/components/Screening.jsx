import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/MoviePage.module.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Login from "./Login";
import CreateUser from "./CreateUser";

dayjs.extend(advancedFormat);
const Screening = (props) => {
	const [show, setShow] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const { loggedIn } = useContext(UserContext);

	useEffect(() => {}, [loggedIn]);
  
	return (
		<div className={styles.tickets}>
			<h6 className={styles.ticketInfo}>
				{dayjs(props.screening.time).format("MMMM Do HH:mm")}
			</h6>
			<h6 className={styles.ticketInfo}>
				Language: {props.screening.movie.language}
			</h6>
			{loggedIn ? (
				<>
          <Link to={`/screening/${props.screening._id}`}>
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
	);
};

export default Screening;
