import styles from "../css/Login.module.css";

const Login = () => {
	return (
		<div className={styles.card}>
			<form className={styles.form}>
				<p>Email</p>
				<input className={styles.inputField} type="text" placeholder="Email" />
				<p>Password</p>
				<input
					className={styles.inputField}
					type="password"
					placeholder="password"
				/>
				<span className={styles.link}>Create new user</span>
				<br />
				<button type="submit" className={styles.btn}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
