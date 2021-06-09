import React, { useState, useContext, useEffect } from "react";
import styles from "../css/ProfilePage.module.css";
import { UserContext } from "../contexts/UserProvider";
import UpcomingBookings from "./UpcomingBookings";
import LastBookings from "./LastBookings";
import dayjs from "dayjs";
const BookingsGroup = () => {
	
	const { whoami, user } =
		useContext(UserContext);

    const[upcomingBookings, setUpcomingBookings]=useState([])
    const[lastBookings, setLastBookings]=useState([])

	useEffect(() => {
    getAllUpcomingBookings()
		whoami();
	}, []);

  const getAllUpcomingBookings =()=>{
    let now = new Date()
    let bookings = user.bookings.map((booking)=>booking.screening.time )
    console.log(bookings)
  }


		return (
			<div>
				<div>
					<div className={styles.info}>
						<h6>Last bookings</h6>
						<hr />
					</div>
					<LastBookings  />
				</div>
				<div>
					<div className={styles.info}>
						<h6>Upcoming bookings</h6>
						<hr />
					</div>
					<UpcomingBookings />
				</div>
			</div>
		);
	
};

export default BookingsGroup;
