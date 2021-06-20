import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import CreateUser from "./CreateUser";
import styles from "../css/Navbar.module.css";

const Navbar = () => {
	const { logout, whoami, loggedIn } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const history = useHistory();

	useEffect(() => {
		whoami();
	}, [loggedIn]);

	const handleSubmit = async () => {
		let result = await logout();
		if (result.success) {
			history.push("/");
		}
	};

	return (
		<div>
			<nav className={styles.navbar}>
				<NavLink className={styles.link} exact to="/">
					Aubameyang
				</NavLink>
				<NavLink className={styles.link} exact to="/about">
					About
				</NavLink>
				{loggedIn ? (
					<>
						<NavLink className={styles.link} exact to="/Profile">
							Profile
						</NavLink>
						<span onClick={handleSubmit} className={styles.link}>
							Logout
						</span>
					</>
				) : (
					<span onClick={() => setShow(true)} className={styles.link}>
						Login
					</span>
				)}
			</nav>
			<Login
				onClose={() => setShow(false)}
				onHandleClick={() => setShowRegister(true)}
				show={show}
			/>
			<CreateUser
				onClose={() => setShowRegister(false)}
				onOpen={() => setShow(true)}
				showRegister={showRegister}
			/>
		</div>
	);
};

export default Navbar;
