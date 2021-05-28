import { useContext } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Length = () => {
	const { setLengthMin, setLengthMax, searchedMovies } = useContext(MovieContext);

  const handleLength=(e)=>{
    console.log(e.target.value)
    if(e.target.value==="1"){
      setLengthMin(`?lengthMin=`+0);
      setLengthMax(`&lengthMax=`+99);
    }else if(e.target.value==="2"){
      setLengthMin(`?lengthMin=`+100);
      setLengthMax(`&lengthMax=`+199);
    }else if(e.target.value==="3"){
      setLengthMin(`?lengthMin=`+200);
    }
  }



	const renderLength = () => {
		return (
			<form >
				<select name="length" onChange={handleLength}>
					<option selected disabled>Length:</option>
					<option value="1" >0-99 min</option>
					<option value="2">100-199 min</option>
					<option value="3">200 min</option>
				</select>
			</form>
		);
	};

	return (
		<div>
      {renderLength()}
		</div>
	);
};

export default Length;
