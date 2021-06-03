import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import styles from "../css/Login.module.css";

const Login = (props) => {
	const { login } = useContext(UserContext);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleClick = () => {
		props.onHandleClick();
		props.onClose();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let user = {
			email,
			password,
		};
		let result = await login(user);
		console.log(result);

		if (result.success) {
			props.onClose();
			setEmail("");
			setPassword("");
		}
	};

	if (!props.show) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={props.onClose}>
			<div className={styles.card} onClick={(e) => e.stopPropagation()}>
				<span onClick={props.onClose} className={styles.close}>
					X
				</span>
				<form className={styles.form} onSubmit={handleSubmit}>
					<p>Email</p>
					<input
						className={styles.inputField}
						type="text"
						value={email}
						onChange={handleEmailChange}
					/>
					<p>Password</p>
					<input
						className={styles.inputField}
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<button type="submit" className={styles.btn}>
						Login
					</button>
					<p className={styles.link} onClick={handleClick}>
						Don't have an account? Create your account here
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
