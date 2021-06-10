import React, { useContext } from "react";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import RenderBookings from "./RenderBookings";

const BookingsGroup = () => {
	const { user } = useContext(UserContext);

	const lastBookings = user.bookings.filter(
		(b) => new Date(b.screening.time) <= new Date()
	);
	const upcomingBooking = user.bookings.filter(
		(b) => new Date(b.screening.time) > new Date()
	);

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.info}>
					<h6>Last bookings</h6>
					<hr />
				</div>
				<RenderBookings renderBookings={lastBookings} />
			</div>
			<div>
				<div className={styles.info}>
					<h6>Upcoming bookings</h6>
					<hr />
				</div>
				<RenderBookings renderBookings={upcomingBooking} />
			</div>
		</div>
	);
};

export default BookingsGroup;
