import React from "react";
import { Link } from "react-router-dom";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Link className={styles.link} to="/">
				Aubameyang
			</Link>
			<Link className={styles.link} to="/about">
				About
			</Link>

			<Link className={styles.link} to="/booking">
				Booking
			</Link>
		</div>
	);
};

export default Navbar;
