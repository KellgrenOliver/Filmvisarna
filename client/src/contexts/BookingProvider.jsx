import { createContext, useState } from "react";

export const BookingContext = createContext();

const BookingProvider = (props) => {
	const [bookings, setBookings] = useState([]);

	const values = {
		bookings
	};

	return (
		<BookingContext.Provider value={values}>
			{props.children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
