import { createContext, useState } from "react";

export const BookingContext = createContext();

const BookingProvider = (props) => {
	const [auditorium, setAuditorium] = useState(null);

	const getAuditoriumById = async (auditoriumId) => {
		let auditorium = await fetch(`/api/v1/auditoria/${auditoriumId}`);
		auditorium = await auditorium.json();
		setAuditorium(auditorium);
	};

	const values = { getAuditoriumById, auditorium };

	return (
		<BookingContext.Provider value={values}>
			{props.children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
