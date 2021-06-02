import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useHistory } from "react-router-dom";
import styles from "../css/Login.module.css";

const Login = (props) => {
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

	if (!props.show) {
		return null;
	}

	return (
		<div className={styles.login}>
			<div className={styles.card}>
				<span onClick={props.onClose} className={styles.close}>
					X
				</span>
				<form className={styles.form} onSubmit={handleSubmit}>
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
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<p className={styles.link} onClick={handleClick}>
						Create new user
					</p>
					<br />
					<button type="submit" className={styles.btn}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
