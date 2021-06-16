import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/Login.module.css";

const CreateUser = (props) => {
	const { createUser, login } = useContext(UserContext);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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
		resetForm();
	};

	const resetForm = () => {
		setEmail("");
		setPassword("");
		setPhone("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let userToCreate = {
			phone,
			email,
			password,
		};

		let result = await createUser(userToCreate);
		if (result.error) {
			setErrorMessage(result.error);
		}
		if (result.success) {
			let user = {
				email,
				password,
			};
			result = await login(user);
			props.onClose();
			resetForm();
		}
	};
	const closeModal = () => {
		props.onClose();
		resetForm();
	};

	if (!props.showRegister) {
		return null;
	}
	return (
		<div className={styles.modal} onClick={closeModal}>
			<div className={styles.card} onClick={(e) => e.stopPropagation()}>
				<span onClick={closeModal} className={styles.close}>
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
					{errorMessage && <p className={styles.error}> {errorMessage} </p>}
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
