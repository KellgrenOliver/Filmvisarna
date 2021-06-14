import React, { useContext, useState } from "react";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import dayjs from "dayjs";
import Modal from "./profilePageModal";

const UpcomingBookings = (props) => {
	const { user, deleteBooking } = useContext(UserContext);
	const [showModal, setShowModal] = useState(false);

	const getSeatValueWeight = (seatType) => {
		switch (seatType.toLowerCase()) {
			case "senior":
				return 0.8;
			case "child":
				return 0.7;
			default:
				return 1;
		}
	};

	const handleDelete = (id) => {
		deleteBooking(id);
	};

	return (
		<div>
			{user.bookings.length !== 0 ? (
				props.renderBookings.map((booking) => (
					<div className={styles.flex} key={booking._id}>
						<Modal
							onClose={() => setShowModal(false)}
							onDelete={() => handleDelete(booking._id)}
							showModal={showModal}
						/>
						<div className={styles.booking}>
							<div
								className={
									props.upcoming ? styles.bookingContainer : styles.shadow
								}
							>
								<div className={styles.flex}>
									<div className={styles.left}>
										<div >
											<span >
												<b>Movie title: </b>
												{booking?.movie.title}
											</span>
										</div>
										{booking.seats.map((seat, i) => (
											<div key={i} className={styles.marginSeat}>
												<b>Seat: </b>
												{seat.row}
												{seat.id} {seat.type}
											</div>
										))}

										<div>
											<span>
												<b>Time: </b>
												{dayjs(booking?.screening.time).format("MMMM Do HH:mm")}
											</span>
										</div>
										<div>
											<span>
												<b>Price: </b>
												{booking.seats.reduce((acc, seat) => {
													return (
														acc +
														booking.screening.price *
															getSeatValueWeight(seat.type)
													);
												}, 0)}
												{" "} SEK
											</span>
										</div>
									</div>
									<div className={styles.center}>
										{props.upcoming && (
											<button
												className={styles.btnCancel}
												onClick={() => setShowModal(true)}
											>
												Cancel
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<p>No Bookings</p>
			)}
		</div>
	);
};

export default UpcomingBookings;
