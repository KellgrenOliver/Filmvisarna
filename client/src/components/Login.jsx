import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useHistory } from "react-router-dom";
import styles from "../css/Login.module.css";

const Login = () => {
	const history = useHistory();
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
		history.push("/createUser");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email !== null && password !== null) {
			let user = {
				email,
				password,
			};
			let result = await login(user);
			console.log(result);

			if (result.success) {
				history.push("/");
			}
		}
	};

	return (
		<div className={styles.card}>
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
				<br />
				<button type="submit" className={styles.btn}>
					Login
				</button>
				<p className={styles.link} onClick={handleClick}>
					Don't have an account? Create your account here
				</p>
			</form>
		</div>
	);
};

export default Login;
