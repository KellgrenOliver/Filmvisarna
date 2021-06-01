import { createContext, useState } from "react";

export const BookingContext = createContext();

const BookingProvider = (props) => {
	const [bookings, setBookings] = useState([]);

	const fetchAllBookings = async (user) => {
		let bookingData = await fetch(`/api/v1/bookings/user/${user._id}`);
		bookingData = await bookingData.json();
		console.log(bookingData);
		setBookings(bookingData);
	};

	const findBooking = (id) => bookings.find((booking) => booking._id === id);

	const values = {
		findBooking,
		fetchAllBookings,
	};

	return (
		<BookingContext.Provider value={values}>
			{props.children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
