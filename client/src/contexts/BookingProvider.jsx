import { createContext, useState, useEffect } from "react";


export const BookingContext = createContext();

const BookingProvider = (props) => {
    const { booking, placeBooking, user } = useState();
    const [ bookings, setBookings ] = useState([]);

    // useEffect(() => {
	// 	placeBooking();
	// }, []);

    const fetchAllBookings = async () => {
        let bookingData = await fetch("/api/v1/bookings/user/${user._id}");
        bookingData = await bookingData.json();
    // const booking = req.body;    
        console.log(bookingData);
        if (bookingData.length === 0) {
            console.log("error");
        } else {
            setBookings(bookingData);
        }
    }
    
    const findBooking = (id) => bookings.find((booking) => booking._id === id);

    const values = {
        findBooking, 
        booking,
        fetchAllBookings
    }
    return ( 
        <BookingContext.Provider value={values}>
            {props.children}
        </BookingContext.Provider>
     );
}
 
export default BookingProvider;