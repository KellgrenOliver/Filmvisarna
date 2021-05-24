import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/CreateUser.module.css";

const CreateUser = () => {
	const history = useHistory();
	const { createUser, login } = useContext(UserContext);
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
			let user = {
				email,
				password,
			};
			result = await login(user);
			history.push("/");
		}
	};

	return (
		<div className={styles.card}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<p>Phone number</p>
				<input
					className={styles.inputField}
					type="text"
					placeholder="phone number"
					value={phone}
					onChange={handlePhoneChange}
					required
				/>
				<p>Email</p>
				<input
					className={styles.inputField}
					type="text"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
					required
				/>
				<p>Password</p>
				<input
					className={styles.inputField}
					type="password"
					placeholder="password"
					value={password}
					onChange={handlePasswordChange}
					required
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
