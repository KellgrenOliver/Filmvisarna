import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import React from "react";
// import { Link } from "react-router-dom";
import { getTicketsPrice } from "../utils/seats";
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

	console.log(booking.movie);

	const content = () => (
		<div className={styles.confirmationPage}>
			<div className={styles.container}>
				{/* <Link to="/" className={styles.x}>
					X
				</Link> */}
				<h4>Thanks for your order, {user.email}!</h4>
				<h6 className={styles.total}>
					Total: {getTicketsPrice(booking.seats, booking.screening.price)} SEK
				</h6>
				<h5>
					{booking.seats.map((seat) => (
						<div className={styles.ticket}>
							<div className={styles.infoContainer}>
								<div className={styles.ticketHeader}>{booking.movie.title}</div>
								<div className={styles.ticketInfo}>
									<div>Salon: {booking.auditorium.id}</div>
									<div>Row: {seat.row}</div>
									<div className={styles.marginFooter}>Seat: {seat.id}</div>
									<div className={styles.ticketFooter}>
										<div>
											{dayjs(booking.screening.time).format("MMMM Do HH:mm")}
										</div>

										<div>{seat.price}SEK</div>
									</div>
								</div>
							</div>
							<img
								className={styles.qrImg}
								src={
									"https://media.nbcbayarea.com/2020/10/qr-code-huge.png?resize=906,1024"
								}
								alt="QR Code"
							/>
						</div>
					))}
				</h5>
			</div>
		</div>
	);
	return <div>{booking && content()}</div>;
};

export default ConfirmationPage;
