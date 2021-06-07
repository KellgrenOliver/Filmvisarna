import { createContext } from "react";

export const BookingContext = createContext();

const BookingProvider = (props) => {
	const values = {};

	return (
		<BookingContext.Provider value={values}>
			{props.children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
