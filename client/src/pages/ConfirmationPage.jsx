import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/ConfirmationPage.module.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const ConfirmationPage = (props) => {
	const { findBooking, user } = useContext(UserContext);

	const booking = findBooking(props.match.params.bookingId);
	console.log("hej");
	console.log(booking);

	if (!booking) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	console.log(booking.movie.title);

	const content = () => (
		<div className={styles.confirmationPage}>
			<div className={styles.container}>
				<Link to="/" className={styles.x}>
					X
				</Link>
				<h4>Thanks for your order, {user.email}!</h4>
				{/* <h5>Salon: {screening.auditorium.id}</h5> */}
				<h5>{booking.movie.title}</h5>
				<h5>
					{booking.seats.map((seat) => (
						<div>
							{seat.row}
							{seat.id}
							{seat.price}
						</div>
					))}
				</h5>
				<h5>{dayjs(booking.screening.time).format("MMMM Do HH:mm")}</h5>
				<img
					className={styles.img}
					src={booking.movie.poster}
					alt={booking.movie.title}
				/>
			</div>
		</div>
	);
	return <div>{booking && content()}</div>;
};

export default ConfirmationPage;
