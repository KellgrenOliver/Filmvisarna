import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/CreateUser.module.css";

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
		let userToCreate = {
			phone,
			email,
			password,
		};

		let result = await createUser(userToCreate);
		console.log(result);
		if (result.success) {
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
					value={phone}
					onChange={handlePhoneChange}
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
