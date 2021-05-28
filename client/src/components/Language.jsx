import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Language = () => {
	const { setLanguage, searchedMovies } = useContext(MovieContext);
  const [items, setItems] = useState("");

  useEffect(() => {
    getItems()
  }, [searchedMovies])

  const getItems=()=>{
    if(searchedMovies){
      let value = searchedMovies.map((movie)=>(movie.language))
      setItems([...new Set(value)])
    }

  }
  console.log(items)
  
  const handleLanguage =()=>{

  }

  const renderLanguage = ()=>{
    return (
     <form>
       <select name="language" onChange={handleLanguage}>
       <option value="0">Language:</option>
       </select>
     </form> 
    )
  }

	
	return (
		<div>
      {renderLanguage()}
		</div>
	);
};

export default Language;
