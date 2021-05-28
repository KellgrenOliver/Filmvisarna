import { useContext } from "react";
import { MovieContext } from "../contexts/MoviesProvider";
import styles from "../css/FilterGroup.module.css";

const Filter = () => {
	const { setLengthMin, setLengthMax } = useContext(MovieContext);


  const handleSelect=(e)=>{
    console.log(e.target.value)
    if(e.target.value==="0"){
      setLengthMin(`?lengthMin=`+0);
      setLengthMax(`&lengthMax=`+900);
    }else if(e.target.value==="1"){
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
				<select name="length" onChange={handleSelect}>
					<option value="0">Length:</option>
					<option value="1" >0-99 min</option>
					<option value="2">100-199 min</option>
					<option value="3">200 min</option>
				</select>
			</form>
		);
	};

	return (
		<div>
			<h3 style={{ color: "white" }}>Filter</h3>
      {renderLength()}
		</div>
	);
};

export default Filter;
