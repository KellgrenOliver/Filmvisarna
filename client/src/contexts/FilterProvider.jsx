import { createContext, useContext, useState, useEffect } from "react";
import { MovieContext } from "./MoviesProvider"
export const FilterContext = createContext();

const FilterProvider = (props)=>{
  const { movies, setMovies, fetchAllMovies} = useContext(MovieContext);

  const search = async (searchString)=>{
    let movieData = await fetch(`/api/v1/movies?search=${searchString}`);
		movieData = await movieData.json();
    console.log(movieData)
		if (movieData.length === 0) {
			console.log("error");
		} else {
			setMovies(movieData);
		}
  }

  const values ={
    search
  }

  return (
		<FilterContext.Provider value={values}>
			{props.children}
		</FilterContext.Provider>
	); 
}

export default FilterProvider