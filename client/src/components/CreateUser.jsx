import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import styles from "../components/css/RegisterUser.module.css";

const CreateUser = () => {
	const history = useHistory();
	const { createUser } = useContext(UserContext);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let userToRegister = {
			phone,
			email,
			password,
		};

		let result = await createUser(userToRegister);
		console.log(result);
		if (result.success) {
			history.push("/");
		}
	};

	return (
		<div className={styles.card}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<p>Username</p>
				<input
					className={styles.inputField}
					type="text"
					placeholder="user name"
					value={userName}
					onChange={handleUserPhoneChange}
				/>
				<p>Email</p>
				<input
					className={styles.inputField}
					type="text"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
				/>
				<p>Password</p>
				<input
					className={styles.inputField}
					type="password"
					placeholder="password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<br />
				<button type="submit" className={styles.btn}>
					Create new user
				</button>
			</form>
		</div>
	);
};

export default CreateUser;
