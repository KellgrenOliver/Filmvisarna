import React, { useState, useContext, useEffect } from "react";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import RenderBookings from "../components/RenderBookings";

const BookingsGroup = () => {
	
	const { whoami, user } =
		useContext(UserContext);
	
	
	

	
	

	useEffect(() => {
		setMessage(null);
		whoami();
	}, []);

	

		return (
			<div>
				<div>
					<div className={styles.info}>
						<h6>Last bookings</h6>
						<hr />
					</div>
					<RenderBookings  />
				</div>
				<div>
					<div className={styles.info}>
						<h6>Upcoming bookings</h6>
						<hr />
					</div>
					<RenderBookings />
				</div>
			</div>
		);
	
};

export default BookingsGroup;
