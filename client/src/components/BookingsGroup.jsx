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

	console.log(lastBookings);
	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<div className={styles.title}>
						<h6>Upcoming bookings</h6>
					</div>
					<hr />
				</div>
				<RenderBookings
					renderBookings={upcomingBooking}
					upcoming={"upcoming"}
				/>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<div className={styles.title}>
						<h6>Last bookings</h6>
					</div>
					<hr />
				</div>
				<RenderBookings renderBookings={lastBookings} />
			</div>
		</React.Fragment>
	);
};

export default BookingsGroup;
