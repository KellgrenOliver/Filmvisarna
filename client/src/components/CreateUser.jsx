import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/Login.module.css";

const CreateUser = (props) => {
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

	const handleClick = () => {
		props.onClose();
		props.onOpen();
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
		}
		props.onClose();
	};
	if (!props.showRegister) {
		return null;
	}
	return (
		<div className={styles.modal} onClick={props.onClose}>
			<div className={styles.card} onClick={(e) => e.stopPropagation()}>
				<span onClick={props.onClose} className={styles.close}>
					X
				</span>
				<form className={styles.form} onSubmit={handleSubmit}>
					<p>Phone number</p>
					<input
						className={styles.inputField}
						type="text"
						value={phone}
						onChange={handlePhoneChange}
						required
					/>
					<p>Email</p>
					<input
						className={styles.inputField}
						type="text"
						value={email}
						onChange={handleEmailChange}
						required
					/>
					<p>Password</p>
					<input
						className={styles.inputField}
						type="password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
					<br />
					<button type="submit" className={styles.btn}>
						Create new user
					</button>
					<p className={styles.link} onClick={handleClick}>
						Already have an account? Login here
					</p>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
