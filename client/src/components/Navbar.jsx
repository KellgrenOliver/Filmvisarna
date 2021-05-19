import { NavLink } from "react-router-dom";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<NavLink className={styles.link} exact to="/">
				Aubameyang
			</NavLink>
			<NavLink className={styles.link} exact to="/about">
				About
			</NavLink>
			<NavLink className={styles.link} exact to="/booking">
				Booking
			</NavLink>
		</nav>
	);
};

export default Navbar;
