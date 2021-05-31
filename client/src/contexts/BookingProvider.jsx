import { PromiseProvider } from "mongoose";
import { createContext, useState, useEffect } from "react";
export const BookingContext = createContext();

const BookingProvider = (props) => {
    const {booking} = useState(([]));

    
    return ( 
        <BookingContext.Provider>
            {PromiseProvider.children}
        </BookingContext.Provider>
     );
}
 
export default BookingProvider;